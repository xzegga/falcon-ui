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

export default function RecordingView({ params }: { params: { id: string } }) {
  const {
    loadingdb,
    resultdbbyid,
    errordb,
    get,
  } = useSurvey() as any;

  const [ url, setUrl ] = useState<string>()
  const [selectedSurvey, setSelectedSurvey] = useState<any>()
  const superbase = createClient()

  useEffect(()=>{
      get(params.id);
      const file = superbase.storage.from("recordings").getPublicUrl(`videos/${params.id}.mp4`)
      setUrl(file.data.publicUrl);
  },[]);

  useEffect(() => {
    get(params.id);
  }, []);

  useEffect(() => {
    if(resultdbbyid){
      const [survey]=resultdbbyid
      setSelectedSurvey(survey)
    }

  }, [resultdbbyid]);

  return (
    <>
      {selectedSurvey && (
        <div className="">
          <div className="flex flex-row">
            <div className="w-1/2 m-2 mt-8">
              {selectedSurvey.type === "webcam" ? (
                <ScreenEmotions id={uuidv4()} />
              ) : (
                <video controls>
                  <source
                    src={url}
                  />
                </video>
              )}
            </div>
            <div className="w-1/2 m-2 mt-8">
              <Summary text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
            </div>
          </div>
          <div className="m-2">
            <Charts
              data={{
                facialExpreData: selectedSurvey?.video_emotions,
                speechData: selectedSurvey?.video_emotions,
              }}
            />
            <Verbatim />
          </div>
        </div>
      )}
    </>
  );
}
