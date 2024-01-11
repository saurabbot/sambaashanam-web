"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  type State = {
    isRecording: boolean;
    isVoicePermissionGranted: boolean;
    isVideoPermissionGranted: boolean;
    cameraStream?: MediaStream;
    videoStream?: MediaStream;
  };
  const initialState: State = {
    isRecording: false,
    isVoicePermissionGranted: false,
    isVideoPermissionGranted: false,
    cameraStream: undefined,
    videoStream: undefined,
  };
  const [state, setState] = useState(initialState);
  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const getVoicePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      return stream;
    } catch (err) {
      console.log(err);
    }
  };
  const getVideoPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      return stream;
    } catch (err) {
      console.log(err);
    }
  };
  const startVideoRecording = async () => {
    const stream = await getVideoPermissions();
    if (stream && cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = stream;
      cameraVideoRef.current.play();
    }
  };
  const getScreenRecordingPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
    } catch (err) {}
  };
  const startScreenRecording = async () => {
    try {
      const stream = await getScreenRecordingPermission();
      if (stream !== undefined && screenVideoRef.current !== null) {
        screenVideoRef.current.srcObject = stream;
        screenVideoRef.current.play();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const stopScreenRecording = () => {
    if (screenVideoRef.current !== null) {
      screenVideoRef.current.srcObject = null;
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Screen recorder App
      <button
        onClick={() => {
          getVoicePermission();
        }}
      >
        get audio permission
      </button>
      <button
        onClick={() => {
          getVideoPermissions();
        }}
      >
        get video permissions
      </button>
      <button
        onClick={() => {
          startVideoRecording();
        }}
      >
        start video recording
      </button>
      <video
        ref={cameraVideoRef}
        className=" border border-blue-500 rounded-full w-44 h-44 object-cover absolute top-2 left-5"
        autoPlay
        muted
        // stretch video and keep aspect ratio
      />
      <button
        onClick={() => {
          startScreenRecording();
        }}
      >
        start screen recording
      </button>
      <button
        onClick={() => {
          stopScreenRecording();
        }}
      >
        stop screen recording
      </button>
    </main>
  );
}
