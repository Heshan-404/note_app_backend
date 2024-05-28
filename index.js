import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import notesRouter from "./routes/note";
import usersRouter from "./routes/user";
import User from "./models/user"; // Import the User model

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load routes
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.json({
    name: "sdate",
  });
});

app.get("/:userId/notes", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ user_id: userId }).populate("notes"); // Use the User model and populate notes
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Start Server
app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
