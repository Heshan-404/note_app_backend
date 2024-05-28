// app.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import notesRouter from "./routes/note"; // Import from notes.js

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
require("dotenv").config({ path: ".env" });

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
app.use("/api/notes", notesRouter);

// Start Server
app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
