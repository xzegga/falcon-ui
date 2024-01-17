"use client";
import Disclaimer from "@/components/composite/disclaimer";
import React, { useEffect, useState } from "react";

export default function TalkCarly() {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  let recognition: any;

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
      setIsListening(true);
    } else {
      console.error("SpeechRecognition is not supported in this browser");
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  return (
    <div>
      <Disclaimer message="This is a disclaimer - Talk to Carly" />
      <div>
        <button onClick={isListening ? stopListening : startListening}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        {recognizedText && (
          <div>
            <p>Recognized Text:</p>
            <p>{recognizedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
