"use client";
import ScreenEmotions from "../../../components/composite/screenEmotions";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useSurvey } from "@/lib/db";
import Summary from "@/components/composite/summary";
import Charts from "@/components/composite/charts";
import Verbatim from "@/components/composite/verbatim";
import { mockDataLineChart, mockDataPieChart } from "@/lib/constants/mockData";

export default function RecordingView({ params }: { params: { id: string } }) {
  const {
    loadingdb,
    resultdb: resultdbbyid,
    errordb,
    get,
  } = useSurvey() as any;

  useEffect(() => {
    get(params.id);
  }, []);

  const { video_emotions: videoEmotions } = resultdbbyid?.find(
    (recording: any) => recording.survey_id === params.id || {}
  );

  useEffect(() => {
    console.log({ resultdbbyid, id: params.id });
  }, [resultdbbyid]);

  return (
    <>
      {resultdbbyid && (
        <div className="">
          <div className="flex flex-row">
            <div className="w-1/2 m-2 mt-8">
              {resultdbbyid.type === "webcam" ? (
                <ScreenEmotions id={uuidv4()} />
              ) : (
                <video controls>
                  <source
                    src={`https://tmilqubytvbtzbohphiq.supabase.co/storage/v1/object/public/recordings/${resultdbbyid?.survey_id}`}
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
                facialExpreData: videoEmotions,
                speechData: mockDataLineChart,
              }}
            />
            <Verbatim />
          </div>
        </div>
      )}
    </>
  );
}
