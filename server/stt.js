// server/stt.js
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function extractAudio(videoPath, audioOutPath = "temp.wav") {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioCodec("pcm_s16le")
      .format("wav")
      .outputOptions("-ar 16000") // 16kHz sample rate
      .save(audioOutPath)
      .on("end", () => resolve(audioOutPath))
      .on("error", (err) => reject(err));
  });
}

export async function transcribe(videoPath) {
  const audioPath = path.resolve("temp.wav");

  // extract audio with ffmpeg
  await extractAudio(videoPath, audioPath);

  const stream = fs.createReadStream(audioPath);

  // Call Whisper API
  const transcription = await client.audio.transcriptions.create({
    file: stream,
    model: "whisper-1",
    response_format: "verbose_json",
  });

  // cleanup
  try { fs.unlinkSync(audioPath); } catch (e) {}

  // map into simple captions array
  return transcription.segments.map((s) => ({
    start: s.start,
    end: s.end,
    text: s.text.trim(),
  }));
}
