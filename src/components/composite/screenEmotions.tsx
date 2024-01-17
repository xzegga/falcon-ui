import { useRef, useEffect, useState } from 'react'
import { useSurvey } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';
import * as faceapi from "face-api.js";
import { useUploadFile } from "@/lib/store";

interface ExpressionSummary {
  [key: string]: number;
}

export default function ScreenEmotions({ id }: { id: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [emotions, setEmotions] = useState<{ emotion: string; date: Date }[]>(
    []
  );
  const { loading, result, error, uploadFile } = useUploadFile() as any;
  const { loadingdb, resultdb, errordb, insert } = useSurvey() as any;
  const [recording, setRecording] = useState<boolean>(false);

  useEffect(() => {
    startVideo();
    videoRef.current && loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let mediaRecorder = useRef<MediaRecorder | undefined>();
  let chunks = [] as BlobPart[];

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
          //get current stream to somehow record

          mediaRecorder.current = new MediaRecorder(currentStream);

          mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          mediaRecorder.current.onstop = () => {
            const survey_id = uuidv4()
            const videoBlob = new Blob(chunks, { type: "video/webm" });
            console.log(emotions)
            uploadFile({ id: survey_id, file: videoBlob });
            const valuedb={
              "title":"test survey insert",
              "agent_id":"70250b46-de70-429f-a6d2-1d5e4d7b7611",
              "start_date":"2024-01-16 14:00:00",
              "end_date":"2024-01-17 13:00:00",
              "type":"recording",
              "status":"pending",
              "video_emotions": emotions
          }
          insert({...valuedb, survey_id})
            // const downloadLink = document.createElement("a");
            // downloadLink.href = URL.createObjectURL(videoBlob);
            // downloadLink.download = "captured-video.webm";
            // downloadLink.click();

            chunks = [];
          };
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);

      faceMyDetect();
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        canvasRef.current.appendChild(
          faceapi.createCanvasFromMedia(videoRef.current)
        );
        faceapi.matchDimensions(canvasRef.current, {
          width: 900,
          height: 650,
        });

        const [myemotion] = detections;
        if (myemotion) {
          const { expressions } = myemotion;
          const expressionList = expressions as any as ExpressionSummary;
          const emotionDetected = Object.keys(expressions).reduce(
            (acc, value) => {
              return expressionList[acc] > expressionList[value] ? acc : value;
            },
            ""
          );

          const emotionObj = { emotion: emotionDetected, date: new Date() };
          setEmotions((current) => [...current, emotionObj]);
        }
      }
    }, 1000);
  };

  const handleStopRecording = () => {
    if (!recording) {
      mediaRecorder.current?.start();
      setRecording(true);
    } else {
      mediaRecorder.current?.stop();
      setRecording(false);
    }
  };

  return (
    <div className="myapp">
      <button
        className="border-full p-1 border-red-900 bg-red-800"
        onClick={handleStopRecording}
      >
        {!recording ? "record" : "recording..."}
      </button>
      <p>{loading ? "uploading..." : ""}</p>
      <p>{error ? error.message || "hey, error" : ""}</p>

      <h1>Face Detection</h1>
      <div className="appvide">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay muted />
      </div>
      <canvas ref={canvasRef} width="400" height="300" className="appcanvas" />
    </div>
  );
}
