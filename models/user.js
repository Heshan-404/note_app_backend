import mongoose from "mongoose";
import NoteSchema from "./note";
const UserSchema = new mongoose.Schema({
  user_id: { type: String, unique: true, required: true },
  notes: [NoteSchema],
});

const User = mongoose.model("User", UserSchema);

export default User;
