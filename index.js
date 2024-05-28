import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import noteRoutes from "./routes/note.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
