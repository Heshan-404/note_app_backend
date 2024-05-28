import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Save Note Route
router.post("/:userId/notes", async (req, res) => {
  try {
    const { userId } = req.params;
    const { note_id, title, content } = req.body;

    let user = await User.findOne({ user_id: userId });

    if (!user) {
      user = new User({
        user_id: userId,
        notes: [],
      });
    }

    const newNote = {
      note_id,
      title,
      content,
      timestamp: new Date(),
    };

    user.notes.push(newNote);

    // Add try-catch block around save operation
    try {
      await user.save();
      res
        .status(201)
        .json({ message: "Note saved successfully", note: newNote });
    } catch (saveError) {
      console.error("Error saving user:", saveError);
      res.status(500).json({ message: "Error saving user" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All Notes for a User
router.get("/:userId/notes", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ user_id: userId });
    if (!user) {
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

    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const note = user.notes.find((note) => note.note_id === noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Error fetching note" });
  }
});

export default router;
