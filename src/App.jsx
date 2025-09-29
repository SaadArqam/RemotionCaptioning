// src/App.jsx
import React, { useState } from "react";
import { Player } from "@remotion/player";
import { CaptionComposition } from "./CaptionComposition";

export default function App() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [preset, setPreset] = useState("bottom");
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    setVideoUrl(URL.createObjectURL(f));
    setCaptions([]); // reset captions
  };

  const handleGenerate = async () => {
    if (!file) return alert("Upload an MP4 first!");
    setLoading(true);

    const form = new FormData();
    form.append("video", file);

    try {
      const res = await fetch("http://localhost:4000/api/transcribe", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (json.captions) {
        setCaptions(json.captions);
      } else {
        alert("No captions received from server");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎬 Remotion Captioning Demo</h1>

      <input type="file" accept="video/mp4" onChange={handleFile} />

      <div style={{ marginTop: 12 }}>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Auto-generate captions"}
        </button>

        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value)}
          style={{ marginLeft: 12 }}
        >
          <option value="bottom">Bottom Centered</option>
          <option value="top">Top Bar</option>
          <option value="karaoke">Karaoke</option>
        </select>
      </div>

      {videoUrl && (
        <div style={{ marginTop: 20 }}>
          <Player
            component={CaptionComposition}
            durationInFrames={900} // ~30 seconds @ 30fps
            fps={30}
            compositionWidth={1280}
            compositionHeight={720}
            controls
            loop
            style={{ width: "720px", height: "405px", border: "1px solid #ccc" }}
            props={{ videoSrc: videoUrl, captions, stylePreset: preset }}
          />
        </div>
      )}

      {captions.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>📝 Captions JSON</h3>
          <pre style={{
            maxHeight: 200,
            overflow: "auto",
            background: "#111",
            color: "#eee",
            padding: 10
          }}>
            {JSON.stringify(captions, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
