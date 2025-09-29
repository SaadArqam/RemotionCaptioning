# 🎬 Remotion Captioning Demo

This project is a **full-stack demo** showing how to:
- Upload an `.mp4` video
- Transcribe speech into text using **OpenAI Whisper**
- Overlay captions in multiple styles (bottom, top bar, karaoke)
- Preview in **Remotion Studio**
- Export a final captioned video as `.mp4`

---

## 🚀 Tech Stack

- **Frontend:** [Remotion](https://www.remotion.dev/) + React
- **Backend:** Express.js + Multer + Fluent-FFmpeg
- **AI Model:** OpenAI Whisper (speech-to-text)
- **Video Export:** Remotion render pipeline

---

## 📂 Folder Structure

```
remotion-captioning-demo/
├── public/           # static assets (e.g. sample.mp4, fonts)
├── server/           # backend code
│   ├── server.js
│   └── stt.js
├── src/              # Remotion compositions & components
│   ├── App.jsx
│   ├── CaptionComposition.jsx
│   ├── CaptionStyles.jsx
│   ├── Root.jsx
│   └── index.js
├── uploads/          # uploaded videos (created automatically)
├── .env              # environment variables (OpenAI API key)
├── package.json
├── remotion.config.js
└── README.md
```

---

## ⚙️ Installation

1. **Clone repo & install dependencies**
   ```bash
   git clone <your-repo-url>
   cd remotion-captioning-demo
   npm install --legacy-peer-deps
   ```

2. **Install FFmpeg**  
   Remotion + Whisper need FFmpeg installed locally.

   - **macOS:**  
     ```bash
     brew install ffmpeg
     ```
   - **Ubuntu:**  
     ```bash
     sudo apt install ffmpeg
     ```
   - **Windows:**  
     Download from [FFmpeg official site](https://ffmpeg.org/download.html)

3. **Setup environment variables**  
   Create `.env` in the root:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

---

## ▶️ Running the Project

**Start backend (speech-to-text API):**
```bash
npm run server
```
Runs on [http://localhost:4000](http://localhost:4000)

**Start frontend (Remotion preview):**
```bash
npm run start
```
Runs on [http://localhost:3000](http://localhost:3000)

**Start both together:**
```bash
npm run dev
```

---

## 🎥 Usage

1. Open [http://localhost:3000](http://localhost:3000)
2. Upload an `.mp4` file
3. Click **Auto-generate captions** → Whisper transcribes speech
4. Choose a caption style (Bottom, Top Bar, Karaoke)
5. Preview video with captions inside Remotion Player
6. (Optional) Inspect the captions JSON in the UI

---

## 📦 Export Final Video

You can render captioned videos to `.mp4` using Remotion CLI.

Register your composition in `src/Root.jsx`:

```jsx
<Composition
  id="CaptionDemo"
  component={CaptionComposition}
  durationInFrames={30 * 60} // 60 seconds @ 30fps
  fps={30}
  width={1280}
  height={720}
  defaultProps={{
    videoSrc: staticFile("sample.mp4"),
    captions: require("../captions.json"),
    stylePreset: "bottom",
  }}
/>
```

Run render:

```bash
npx remotion render CaptionDemo out.mp4
```

The video will be exported to `out.mp4`.

---

## ✨ Features

- Multiple caption styles (bottom, top bar, karaoke)
- Full backend integration with Whisper
- JSON captions export
- MP4 rendering with Remotion

---

## 📝 License

This project is for educational/demo purposes as part of an internship task.

# RemotionCaptioning
