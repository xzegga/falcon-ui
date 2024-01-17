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

export function ResizableBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultLayout = [30, 70];
  // Just to emulate db
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
  ];
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Recordings</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Live
                </TabsTrigger>
                <TabsTrigger
                  value="file"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  File
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 justify-center pt-4 pr-4 pl-4">
                  <Button className="">
                  <Radio className="mr-2 h-4 w-4" />
                    New Live
                  </Button>
                  <Button className="">
                    <File className="mr-2 h-4 w-4" />
                    New File
                  </Button>
              </div>
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <RecordingList items={recordings} />
            </TabsContent>
            <TabsContent value="live" className="m-0">
              <RecordingList
                items={recordings.filter((item) => item.source === "live")}
              />
            </TabsContent>
            <TabsContent value="file" className="m-0">
              <RecordingList
                items={recordings.filter((item) => item.source === "file")}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
