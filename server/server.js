// server/server.js
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { transcribe } from "./stt.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// API endpoint for transcription
app.post("/api/transcribe", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const videoPath = path.resolve(req.file.path);
    const captions = await transcribe(videoPath);

    // cleanup uploaded file
    fs.unlink(videoPath, () => {});
    res.json({ captions });
  } catch (err) {
    console.error("Transcription error:", err);
    res.status(500).json({ error: err.message || "Failed to transcribe" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ STT server running at http://localhost:${PORT}`);
});
