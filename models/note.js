const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  timestamp: { type: Date, default: Date.now }, // Use Date.now for automatic timestamp
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
