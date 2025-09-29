// src/CaptionComposition.jsx
import React from "react";
import { Video, useCurrentFrame, useVideoConfig } from "remotion";
import { BottomCentered, TopBar, Karaoke } from "./CaptionStyles";

export const CaptionComposition = ({ videoSrc, captions = [], stylePreset = "bottom" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find the current caption by matching time
  const currentCaption = captions.find(
    (c) => currentTime >= c.start && currentTime <= c.end
  );

  let CaptionComponent = BottomCentered;
  if (stylePreset === "top") CaptionComponent = TopBar;
  if (stylePreset === "karaoke") CaptionComponent = Karaoke;

  return (
    <div style={{ flex: 1, backgroundColor: "black" }}>
      <Video src={videoSrc} />
      {currentCaption && <CaptionComponent text={currentCaption.text} />}
    </div>
  );
};
