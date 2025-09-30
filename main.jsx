import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Capture } from "./capture.jsx";
import { Player } from "@websim/remotion/player";
import { PoseVideoComposition } from "./composition.jsx";
const App = () => {
  const [stage, setStage] = useState("upload");
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [poseData, setPoseData] = useState(null);
  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      setAudioDuration(audio.duration);
      setStage("capture");
    });
  };
  const handleRecordingComplete = (recordedPoseData) => {
    setPoseData(recordedPoseData);
    setStage("preview");
  };
  const handleReset = () => {
    setStage("upload");
    setAudioFile(null);
    setAudioUrl(null);
    setAudioDuration(0);
    setPoseData(null);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "app", children: [
    stage === "upload" && /* @__PURE__ */ jsxDEV("div", { className: "upload-screen", children: /* @__PURE__ */ jsxDEV("div", { className: "upload-container", children: [
      /* @__PURE__ */ jsxDEV("h1", { children: "Pose Music Video Maker" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 48,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Upload your audio track to get started" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 49,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("label", { className: "upload-btn", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "file",
            accept: "audio/*",
            onChange: handleAudioUpload,
            style: { display: "none" }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 51,
            columnNumber: 15
          }
        ),
        "Choose Audio File"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 50,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 47,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 46,
      columnNumber: 9
    }),
    stage === "capture" && /* @__PURE__ */ jsxDEV(
      Capture,
      {
        audioUrl,
        audioDuration,
        onComplete: handleRecordingComplete,
        onBack: handleReset
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 64,
        columnNumber: 9
      }
    ),
    stage === "preview" && poseData && /* @__PURE__ */ jsxDEV("div", { className: "preview-screen", children: /* @__PURE__ */ jsxDEV("div", { className: "preview-container", children: [
      /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 75,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(
        Player,
        {
          component: PoseVideoComposition,
          durationInFrames: Math.ceil(audioDuration * 30),
          fps: 30,
          compositionWidth: 540,
          compositionHeight: 960,
          loop: true,
          controls: true,
          inputProps: { poseData, audioUrl },
          style: { width: "100%", maxWidth: "540px", margin: "0 auto" }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 76,
          columnNumber: 13
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "preview-actions", children: /* @__PURE__ */ jsxDEV("button", { onClick: handleReset, className: "secondary-btn", children: "Make Another" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 88,
        columnNumber: 15
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 87,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 74,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 44,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 99,
  columnNumber: 51
}));
