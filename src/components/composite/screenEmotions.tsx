import {useRef,useEffect, useState} from 'react'
import * as faceapi from 'face-api.js'

export default function ScreenEmotions(){
    const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [emotions, setEmotions] = useState<{ emotion: string; date: Date }[]>([]);

  useEffect(() => {
    startVideo();
    videoRef.current && loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);

      faceMyDetect();
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectAllFaces(videoRef.current,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        faceapi.matchDimensions(canvasRef.current, {
          width: 900,
          height: 650,
        });

        const [myemotion] = detections;
        if (myemotion) {
          const { expressions } = myemotion;
          const emotionDetected = Object.keys(expressions).reduce((acc, value) => {
            return (expressions[acc] > expressions[value] ? acc : value);
          }, '');

          const emotionObj = { emotion: emotionDetected, date: new Date() };
          setEmotions((current) => [...current, emotionObj]);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    console.log(emotions);
  }, [emotions]);

    return (
        <div className="myapp">
        <h1>Face Detection</h1>
        <div className="appvide">
          <video crossOrigin="anonymous" ref={videoRef} autoPlay />
        </div>
        <canvas ref={canvasRef} width="400" height="300" className="appcanvas" />
      </div>
        )
}
