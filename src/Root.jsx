// src/Root.jsx
import React from "react";
import { Composition, staticFile } from "remotion";
import { CaptionComposition } from "./CaptionComposition";

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="CaptionDemo"
        component={CaptionComposition}
        durationInFrames={30 * 10} // 10 sec @ 30fps
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          // ✅ staticFile tells Remotion to look in /public
          videoSrc: staticFile("sample.mp4"),
          captions: [
            { start: 0, end: 2, text: "Hello World!" },
            { start: 2, end: 4, text: "This is auto-captioning demo." },
          ],
          stylePreset: "bottom",
        }}
      />
    </>
  );
};
