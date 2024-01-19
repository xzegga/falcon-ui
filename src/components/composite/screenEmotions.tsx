import { useRef, useEffect, useState } from "react";
import { useSurvey } from "@/lib/db";
import * as faceapi from "face-api.js";
import { useUploadFile } from "@/lib/store";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { dataSetFormatter } from "@/lib/dataSetFormatter";
import { topicsKeys, topics } from "@/lib/topics";

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
  const [stardDate, setStartDate] = useState<Date>();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands: topicsKeys });

  if (browserSupportsSpeechRecognition) {
    SpeechRecognition.startListening({ continuous: true })
  }

  useEffect(() => {
    startVideo();
    startAudio();
    videoRef.current && loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let videoRecorderRef = useRef<MediaRecorder | undefined>();
  let audioRecorderRef = useRef<MediaRecorder | undefined>();
  let audioChunks = [] as BlobPart[];
  let videoChunks = [] as BlobPart[];

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }

        videoRecorderRef.current = new MediaRecorder(currentStream);

        videoRecorderRef.current.ondataavailable = handleVideoData;

        videoRecorderRef.current.onstop = () => {
          const videoBlob = new Blob(videoChunks, { type: "video/mp4" });
          uploadFile({ id, file: videoBlob, type: "video" });

          videoChunks = [];
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((currentStream) => {
        audioRecorderRef.current = new MediaRecorder(currentStream);

        audioRecorderRef.current.ondataavailable = handleAudioData;

        audioRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          uploadFile({ id, file: audioBlob, type: "audio" });

          audioChunks = [];
        };
      });
  };

  const handleVideoData = (evt: BlobEvent) => {
    if (evt.data.size > 0) videoChunks.push(evt.data);
  };

  const handleAudioData = (evt: BlobEvent) => {
    if (evt.data.size > 0) audioChunks.push(evt.data);
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

  const recordingStart = () => {
    videoRecorderRef.current?.start();
    audioRecorderRef.current?.start();
  }

  const recordingStop = () => {
    videoRecorderRef.current?.stop();
    audioRecorderRef.current?.stop();
  }

  const handleStartRecording = () => {
    // Start speech recognition
    SpeechRecognition.startListening({ continuous: true });
    setStartDate(new Date());
    recordingStart();
  }

  const handleStopRecording = () => {
    recordingStop();
    SpeechRecognition.stopListening();
    const survey = {
      title: "Test Survey",
      agent_id: "70250b46-de70-429f-a6d2-1d5e4d7b7611",
      start_date: stardDate,
      end_date: new Date(),
      type: "recording",
      status: "pending",
      video_emotions: dataSetFormatter(emotions),
    };
    insert({ ...survey, survey_id: id });
  };

  const startListening = () => {
    videoRecorderRef.current?.stop();
    audioRecorderRef.current?.stop();
  };

  return (
    <div>
{/*       <button
        className="border-full p-1 border-red-900 bg-red-800"
        onClick={handleStartRecording}
      >
        Record
      </button>
      <button
        className="border-full p-1 border-red-900 bg-red-800"
        onClick={handleStopRecording}
      >
        Stop Recording
      </button>
      <p>{loading ? "uploading..." : ""}</p>
      <p>{loadingdb ? "saving..." : ""}</p>
      <p>{error ? error.message || "hey, error" : ""}</p>

      <div>
        <p>{transcript}</p>
      </div> */}
      <div className="bg-[#FAA71C] p-1 rounded-md w-[600px] h-[452px]">
        <div className="relative rounded-md overflow-hidden">
          <video crossOrigin="anonymous" ref={videoRef} autoPlay muted className="" />
          <canvas ref={canvasRef} width="1" height="1" className="appcanvas absolute" />
        </div>
      </div>

    </div>
  );
}
