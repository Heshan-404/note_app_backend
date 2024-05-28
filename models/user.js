import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  note_id: String,
  title: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  user_id: String,
  notes: [noteSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
