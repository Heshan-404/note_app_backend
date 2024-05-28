import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

export default User;
