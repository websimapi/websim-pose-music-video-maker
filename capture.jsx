import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useEffect, useState } from "react";
const Capture = ({ audioUrl, audioDuration, onComplete, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(3);
  const [isRecording, setIsRecording] = useState(false);
  const [poseDetector, setPoseDetector] = useState(null);
  const [recordedPoses, setRecordedPoses] = useState([]);
  const audioRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  useEffect(() => {
    let stream = null;
    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        const { Pose } = await import("@mediapipe/pose");
        const pose = new Pose({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
          }
        });
        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        await pose.initialize();
        setPoseDetector(pose);
      } catch (error) {
        console.error("Error setting up camera:", error);
        alert("Camera access denied. Please allow camera access.");
      }
    };
    setupCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isRecording && poseDetector) {
      startRecording();
    }
  }, [countdown, isRecording, poseDetector]);
  const startRecording = () => {
    setIsRecording(true);
    startTimeRef.current = Date.now();
    if (audioRef.current) {
      audioRef.current.play();
    }
    detectPose();
  };
  const detectPose = async () => {
    if (!isRecording || !videoRef.current || !poseDetector) return;
    const currentTime = (Date.now() - startTimeRef.current) / 1e3;
    if (currentTime >= audioDuration) {
      stopRecording();
      return;
    }
    try {
      await poseDetector.send({ image: videoRef.current });
      poseDetector.onResults((results) => {
        if (results.poseLandmarks) {
          setRecordedPoses((prev) => [
            ...prev,
            {
              time: currentTime,
              landmarks: results.poseLandmarks
            }
          ]);
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          drawPose(ctx, results.poseLandmarks, canvas.width, canvas.height);
        }
      });
    } catch (error) {
      console.error("Pose detection error:", error);
    }
    animationFrameRef.current = requestAnimationFrame(detectPose);
  };
  const drawPose = (ctx, landmarks, width, height) => {
    const connections = [
      [11, 12],
      [11, 13],
      [13, 15],
      [12, 14],
      [14, 16],
      // Arms
      [11, 23],
      [12, 24],
      [23, 24],
      // Torso
      [23, 25],
      [25, 27],
      [27, 29],
      [29, 31],
      // Left leg
      [24, 26],
      [26, 28],
      [28, 30],
      [30, 32]
      // Right leg
    ];
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 3;
    connections.forEach(([start, end]) => {
      const startPoint = landmarks[start];
      const endPoint = landmarks[end];
      if (startPoint && endPoint) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x * width, startPoint.y * height);
        ctx.lineTo(endPoint.x * width, endPoint.y * height);
        ctx.stroke();
      }
    });
    ctx.fillStyle = "#00ff00";
    landmarks.forEach((landmark) => {
      ctx.beginPath();
      ctx.arc(landmark.x * width, landmark.y * height, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };
  const stopRecording = () => {
    setIsRecording(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onComplete(recordedPoses);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "capture-screen", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "capture-header", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: onBack, className: "back-btn", children: "\u2190 Back" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 181,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Recording" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 184,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 185,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 180,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "camera-container", children: [
      /* @__PURE__ */ jsxDEV(
        "video",
        {
          ref: videoRef,
          style: { display: "none" },
          playsInline: true,
          muted: true
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 189,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV(
        "canvas",
        {
          ref: canvasRef,
          width: 640,
          height: 480,
          className: "camera-canvas"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 195,
          columnNumber: 9
        }
      ),
      countdown > 0 && /* @__PURE__ */ jsxDEV("div", { className: "countdown-overlay", children: /* @__PURE__ */ jsxDEV("div", { className: "countdown-number", children: countdown }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 204,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 203,
        columnNumber: 11
      }),
      isRecording && /* @__PURE__ */ jsxDEV("div", { className: "recording-indicator", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "rec-dot" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 210,
          columnNumber: 13
        }),
        "REC"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 209,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 188,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("audio", { ref: audioRef, src: audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 216,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "capture-info", children: [
      /* @__PURE__ */ jsxDEV("p", { children: "Get ready! The music will start after countdown." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 219,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Move your body to the beat!" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 220,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 218,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 179,
    columnNumber: 5
  });
};
export {
  Capture
};
