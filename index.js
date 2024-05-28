import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import notesRouter from "./routes/note";
import usersRouter from "./routes/user";

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

    // Directly access the MongoDB collection
    const db = mongoose.connection;
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Start Server
app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
