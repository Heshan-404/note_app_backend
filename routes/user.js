import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Create a new User
router.post("/", async (req, res) => {
  try {
    const { user_id } = req.body;

    const newUser = new User({ user_id });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

export default router;
