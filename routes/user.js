import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Save User Route
router.post("/", async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = new User({ user_id });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
