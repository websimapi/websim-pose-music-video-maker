import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
const PoseVideoComposition = ({ poseData, audioUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;
  const getCurrentPose = () => {
    if (!poseData || poseData.length === 0) return null;
    let closestPose = poseData[0];
    let minDiff = Math.abs(poseData[0].time - currentTime);
    for (let i = 1; i < poseData.length; i++) {
      const diff = Math.abs(poseData[i].time - currentTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestPose = poseData[i];
      }
    }
    return closestPose;
  };
  const currentPose = getCurrentPose();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: [
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: [...Array(20)].map((_, i) => {
      const scale = interpolate(
        (frame + i * 5) % 60,
        [0, 30, 60],
        [0.5, 1, 0.5],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        }
      );
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            position: "absolute",
            left: `${i * 33 % 100}%`,
            top: `${i * 47 % 100}%`,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            transform: `scale(${scale})`
          }
        },
        i,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 57,
          columnNumber: 13
        }
      );
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 44,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          justifyContent: "center",
          alignItems: "center",
          opacity
        },
        children: /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", style: { position: "absolute" }, children: currentPose && /* @__PURE__ */ jsxDEV("g", { children: [
          [
            [11, 12],
            [11, 13],
            [13, 15],
            [12, 14],
            [14, 16],
            [11, 23],
            [12, 24],
            [23, 24],
            [23, 25],
            [25, 27],
            [27, 29],
            [29, 31],
            [24, 26],
            [26, 28],
            [28, 30],
            [30, 32]
          ].map(([start, end], i) => {
            const startPoint = currentPose.landmarks[start];
            const endPoint = currentPose.landmarks[end];
            if (startPoint && endPoint) {
              return /* @__PURE__ */ jsxDEV(
                "line",
                {
                  x1: startPoint.x * 540,
                  y1: startPoint.y * 960,
                  x2: endPoint.x * 540,
                  y2: endPoint.y * 960,
                  stroke: "#00ff88",
                  strokeWidth: "8",
                  strokeLinecap: "round",
                  style: {
                    filter: "drop-shadow(0 0 10px rgba(0, 255, 136, 0.8))"
                  }
                },
                i,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 97,
                  columnNumber: 21
                }
              );
            }
            return null;
          }),
          currentPose.landmarks.map((landmark, i) => /* @__PURE__ */ jsxDEV(
            "circle",
            {
              cx: landmark.x * 540,
              cy: landmark.y * 960,
              r: "8",
              fill: "#ffffff",
              style: {
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))"
              }
            },
            i,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 117,
              columnNumber: 17
            }
          ))
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 82,
          columnNumber: 9
        })
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 75,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(Audio, { src: audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 134,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 36,
    columnNumber: 5
  });
};
export {
  PoseVideoComposition
};
