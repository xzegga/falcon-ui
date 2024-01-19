"use client";
import ScreenEmotions from "../../../components/composite/screenEmotions";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useSurvey } from "@/lib/db";
import Summary from "@/components/composite/summary";
import Charts from "@/components/composite/charts";
import Verbatim from "@/components/composite/verbatim";
import { mockDataLineChart, mockDataPieChart } from "@/lib/constants/mockData";
import { createClient } from "@/lib/supabase/client";
import GaugeChart from "@/components/composite/gaugeChart";

export default function RecordingView({ params }: { params: { id: string } }) {
  const { loadingdb, resultdbbyid, errordb, get } = useSurvey() as any;

  const [url, setUrl] = useState<string>();
  const [selectedSurvey, setSelectedSurvey] = useState<any>();
  const superbase = createClient();

  useEffect(() => {
    get(params.id);
    const file = superbase.storage
      .from("recordings")
      .getPublicUrl(`videos/${params.id}.mp4`);
    setUrl(file.data.publicUrl);
  }, []);

  useEffect(() => {
    get(params.id);
  }, []);

  useEffect(() => {
    if (resultdbbyid) {
      const [survey] = resultdbbyid;
      setSelectedSurvey(survey);
    }
  }, [resultdbbyid]);

  return (
    <>
      {selectedSurvey && (
        <div className="">
          <div className="flex flex-row">
            <div className="w-1/2 m-2 mt-8 relative">
              {selectedSurvey.type === "webcam" ? (
                <ScreenEmotions id={uuidv4()} />
              ) : (
                <video className="w-full h-full" controls>
                  <source src={url} />
                </video>
              )}
              <div className="absolute top-8 right-6">
                <GaugeChart value={selectedSurvey.score} />
                <h1 className="text-white -mt-3 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Score
                </h1>
              </div>
            </div>
            <div className="w-1/2 m-2 mt-8">
              {/* <div className="">
                <h1 className="text-xl text-secondary-600 mb-2">Score</h1>
                
              </div> */}
              {selectedSurvey.analysis && (
                <div className="">
                  <Summary text={selectedSurvey.analysis.content} />
                </div>
              )}
            </div>
          </div>
          <div className="m-2">
            <Charts
              data={{
                facialExpreData: selectedSurvey?.video_emotions,
                speechData: selectedSurvey?.video_emotions,
              }}
            />
            {selectedSurvey.transcript && (
              <Verbatim data={selectedSurvey.transcript} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
