import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  note_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  notes: [NoteSchema],
});

const User = mongoose.model("User", UserSchema);

export default User;
