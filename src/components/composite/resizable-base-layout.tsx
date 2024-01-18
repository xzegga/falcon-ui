"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Radio, Search } from "lucide-react";
import { RecordingList } from "@/components/composite/recording-list";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import Navbar from "../ui/navbar";
import { useEffect } from "react";
import { useSurvey } from "@/lib/db";

export function ResizableBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultLayout = [30, 70];

  const { loadingdb, resultdb, errordb, get } = useSurvey() as any;
  useEffect(() => {
    get();
  }, []);

  const today = new Date();
  const recordings = [
    {
      id: "c815cb17-2634-409e-9c3f-56ac1de5f222",
      title: "Did you got the assistance you needed?",
      transcription:
        "Yes, I got the assistance I needed. I am very happy with the service provided by the agent. I would like to give a 5 star rating to the agent. Thank you.",
      type: "video",
      source: "file",
      created_at: `${today.getHours()}:${today.getMinutes()}`,
    },
    {
      id: "484f4749-e366-474f-be17-fab60d07beb9",
      title: "Opinion on the new product",
      transcription:
        "I am very happy with the new product. I would like to give a 5 star rating to the agent. Thank you.",
      type: "video",
      source: "live",
      created_at: `${today.getHours()}:${today.getMinutes()}`,
    },
    {
      id: "484f4749-e366-474f-be17-fab60d05beb0",
      title: "By WebCam",
      transcription: "capturing from WebCam.",
      type: "video",
      source: "webcam",
      created_at: `${today.getHours()}:${today.getMinutes()}`,
    },
  ];

  return (
    <>
      {resultdb && (
        <div className="flex flex-row">
          <div className="w-1/4">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-500">
              <h2 className="text-xl text-secondary-600">Recordings</h2>
              <div className="flex gap-1">
                <Button variant={"link"}>All</Button>
                <Button variant={"link"}>Live</Button>
                <Button variant={"link"}>File</Button>
              </div>
            </div>
            <div className="px-4 py-2 flex gap-2">
              <Button className="rounded w-1/2">
                <Radio className="mr-2 h-4 w-4" />
                New Live
              </Button>
              <Button className="rounded w-1/2">
                <File className="mr-2 h-4 w-4" />
                New File
              </Button>
            </div>
            <div className="px-4 py-2">
              <form className="w-full">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <div className="mt-2 py-4 bg-slate-300 overflow-y-scroll h-[calc(100vh)]">
              <RecordingList items={resultdb} />
            </div>
          </div>
          <div className="w-3/4">{children}</div>
        </div>
      )}
    </>
  );
}
