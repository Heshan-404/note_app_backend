import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import notesRouter from "./routes/note";
import usersRouter from "./routes/user";

const app = express();
const port = process.env.PORT || 3000;
const route = Router();
// Load environment variables
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load routes
app.use("/api/users", usersRouter);
app.use("/api/users", notesRouter);
// Start Server
app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
