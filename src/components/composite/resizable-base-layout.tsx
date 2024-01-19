"use client";
import { RecordingList } from "@/components/composite/recording-list";
import { useEffect } from "react";
import { useSurvey } from "@/lib/db";

export function ResizableBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { loadingdb, resultdb, errordb, get } = useSurvey() as any;
  useEffect(() => {
    get();
  }, []);

  const today = new Date();
  return (
    <>
      {resultdb && (
        <div className="flex flex-row mt-14">
          <div className="w-1/4">
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-xl text-secondary-600">Recordings</h2>
            </div>
            <div className="mt-2 bg-gray-200 overflow-y-scroll h-[calc(100vh)]">
              <RecordingList items={resultdb} />
            </div>
          </div>
          <div className="w-3/4 bg-gray-200">{children}</div>
        </div>
      )}
    </>
  );
}
