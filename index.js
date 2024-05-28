import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import notesRouter from "./routes/note.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
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
app.use("/api", notesRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
