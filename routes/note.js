import express from "express";
import Note from "../models/note.js";

const router = express.Router();

// Save Note Route
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, content, note_id } = req.body;

    const note = new Note({
      user_id: userId,
      note_id,
      title,
      content,
    });

    await note.save();

    res.status(201).json({ message: "Note saved successfully", note });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all notes of a user by user_id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await Note.find({ user_id: userId });
    if (notes.length === 0) {
      return res.status(404).json({ message: "Notes not found for this user" });
    }

    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get note details by note_id
router.get("/:userId/:noteId", async (req, res) => {
  try {
    const { userId, noteId } = req.params;

    const note = await Note.findOne({ user_id: userId, note_id: noteId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
