import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  note_id: { type: String, required: true },
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
