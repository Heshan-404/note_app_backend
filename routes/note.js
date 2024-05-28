// routes/notes.js
import express from "express";
import Note from "../models/note.js";

const router = express.Router();

// Save Note Route
router.post("/", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json({ message: "Note saved successfully" });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ message: "Error saving note" });
  }
});

// Get All Notes Route
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

export default router;
