// src/CaptionStyles.jsx
import React from "react";

export const BottomCentered = ({ text }) => (
  <div style={{
    position: "absolute",
    bottom: 60,
    width: "100%",
    textAlign: "center",
    fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif",
    fontSize: 40,
    fontWeight: "700",
    color: "white",
    textShadow: "2px 2px 6px rgba(0,0,0,0.8)"
  }}>{text}</div>
);

export const TopBar = ({ text }) => (
  <div style={{
    position: "absolute",
    top: 20,
    width: "100%",
    textAlign: "center",
    background: "rgba(0,0,0,0.5)",
    padding: "8px 12px",
    fontSize: 32,
    color: "white",
    fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif",
  }}>{text}</div>
);

export const Karaoke = ({ text }) => (
  <div style={{
    position: "absolute",
    bottom: 100,
    width: "100%",
    textAlign: "center",
    fontSize: 36,
    fontWeight: "800",
    color: "#00ffea",
    fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif",
    textShadow: "0 2px 6px rgba(0,0,0,0.7)"
  }}>{text}</div>
);
