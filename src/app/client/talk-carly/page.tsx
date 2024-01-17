"use client";
import Disclaimer from "@/components/composite/disclaimer";
import Summary from "@/components/composite/summary";
import Back from "@/components/ui/backButton";
import React, { useEffect, useState } from "react";

export default function TalkCarly() {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  let recognition: any;

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.onresult = (event: any) => {
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
    <>
       <div className="flex items-center">
        <Back />
        <Disclaimer message="This is a disclaimer - Talk Carly" />
      </div>
      <div className="flex w-full justify-center">
        <Summary text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
      </div>
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
    </>
  );
}
