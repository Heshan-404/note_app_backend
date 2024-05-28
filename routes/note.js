import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Middleware to handle timeouts
const timeoutMiddleware = (req, res, next) => {
  res.setTimeout(10000, () => {
    // Set a timeout of 10 seconds
    res
      .status(503)
      .json({ message: "Service unavailable. Request timed out." });
  });
  next();
};

// Apply the timeout middleware
router.use(timeoutMiddleware);

// Save Note Route
router.post("/:userId/notes", async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, content } = req.body;

    console.log(`Finding user with user_id: ${userId}`);
    const user = await User.findOne({ user_id: userId }).exec();

    if (!user) {
      console.log(`User with user_id: ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const newNote = {
      title,
      content,
      timestamp: new Date(), // Using the current time for timestamp
    };

    user.notes.push(newNote);
    await user.save();

    console.log(`Note saved for user with user_id: ${userId}`);
    res.status(201).json({ message: "Note saved successfully", note: newNote });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ message: "Error saving note" });
  }
});

// Get All Notes for a User
router.get("/:userId/notes", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(`Finding user with user_id: ${userId}`);
    const user = await User.findOne({ user_id: userId }).exec();

    if (!user) {
      console.log(`User with user_id: ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Get Note by ID for a User
router.get("/:userId/notes/:noteId", async (req, res) => {
  try {
    const { userId, noteId } = req.params;

    console.log(`Finding user with user_id: ${userId}`);
    const user = await User.findOne({ user_id: userId }).exec();

    if (!user) {
      console.log(`User with user_id: ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const note = user.notes.id(noteId);
    if (!note) {
      console.log(`Note with id: ${noteId} not found`);
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ abc: "abcd" });
    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Error fetching note" });
  }
});

export default router;
