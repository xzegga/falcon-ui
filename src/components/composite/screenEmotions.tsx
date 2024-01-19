"use client";
import { useRef, useEffect, useState } from "react";
import { useSurvey } from "@/lib/db";
import * as faceapi from "face-api.js";
import { useUploadFile } from "@/lib/store";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { dataSetFormatter, topicsFormat, correlationTopicEmotion } from "@/lib/dataSetFormatter";
import { topicsKeys, topics, TopicValue } from "@/lib/topics";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Transcript from "./live-transcription";

interface ExpressionSummary {
  [key: string]: number;
}

export default function ScreenEmotions({ id, selected, topicsUtils }: {
  id: string, selected: number, topicsUtils: {
    topics: Set<TopicValue> | undefined,
    setTopics: React.Dispatch<React.SetStateAction<Set<TopicValue> | undefined>>
  }
}) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [emotions, setEmotions] = useState<{ emotion: string; date: Date }[]>(
    []
  );
  const { loading, result, error, uploadFile, status: uploadStatus } = useUploadFile() as any;
  const { loadingdb, resultdb, errordb, insert, status: surveyStatus } = useSurvey() as any;
  const [stardDate, setStartDate] = useState<Date>();
  const [isRecording, setIsRecording] = useState<string>('iddle');
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
          if (topics) console.log(topicsFormat(topics).topicValues)
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
    setIsRecording('recording');

    SpeechRecognition.startListening({ continuous: true });
    setStartDate(new Date());
    recordingStart();
  }

  const handleStopRecording = () => {

    setIsRecording('stopped');
    SpeechRecognition.stopListening();
    recordingStop();
    if (topics) {
      correlationTopicEmotion(topics, emotions)
      topicsUtils.setTopics(topics);
    }
    const survey = {
      title: "Test Survey",
      agent_id: "70250b46-de70-429f-a6d2-1d5e4d7b7611",
      start_date: stardDate,
      end_date: new Date(),
      type: "recording",
      status: "pending",
      topics: topicsFormat(topics).topicDataSet,
      correlation: topics ? correlationTopicEmotion(topics, emotions) : [],
      video_emotions: dataSetFormatter(emotions),
      score: selected,
    };
    console.log('Topics', topics)
    insert({ ...survey, survey_id: id });

  };

  const startListening = () => {
    videoRecorderRef.current?.stop();
    audioRecorderRef.current?.stop();
  };

  useEffect(() => {
    if (uploadStatus === 'success' && surveyStatus === 'success') {
      console.log(uploadStatus, surveyStatus);
      router.push('/client/thank-you');
    }
  }, [uploadStatus, surveyStatus]);


  return (
    <NextUIProvider>
      <div>

        <div className="relative bg-[#FAA71C] p-1 rounded-md w-[600px] h-[452px]">
          {videoRef.current && canvasRef.current && (
            <div className="z-20 absolute bottom-4 left-1/2 transform -translate-x-1/2">

              {isRecording === 'iddle' ? (

                <button
                  onClick={() => handleStartRecording()}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full flex 
              items-center hover:bg-red-600" >
                  <Image src="/assets/start.svg" width={20} height={20} alt="Start Recording" className="w-6 h-6 mr-2" />
                  <span>Start Recording</span>
                </button>

              ) : isRecording === 'recording' ? (

                <button
                  onClick={handleStopRecording}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-full flex items-center hover:bg-red-600">
                  <Image src="/assets/stop.svg" width={20} height={20} alt="Stop Recording" className="w-6 h-6 mr-2" />
                  <span>Stop Recording</span>
                </button>

              ) : null}


            </div>)

          }
          <div>
            {
              (loading || loadingdb) ? (
                <div
                  className="w-full bg-[#FAA71C] flex gap-2 p-2 items-center space-x-2p-2
                        absolute z-20 box-border border-4 border-t-0 border-b-0 border-[#FAA71C] bottom-1">
                  <Spinner color="white" size="sm" />
                  <span className="text-sm font-base text-white">Loading and saving your recording, please wait...</span>
                </div>
              ) : ""
            }
          </div>
          <div className="relative rounded-md overflow-hidden">
            <video crossOrigin="anonymous" ref={videoRef} autoPlay muted className="z-10" />
            <canvas ref={canvasRef} width="1" height="1" className="appcanvas absolute z-0" />
          </div>
          {transcript !== '' && isRecording === 'recording' ? <Transcript transcript={transcript} /> : null}

        </div>

      </div >
    </NextUIProvider>
  );
}
