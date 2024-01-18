"use client";
import React, { useRef } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Dropzone from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";

export default function FileUpload() {
  return (
    <div className="w-full p-4">
      <Card className="p-4 flex gap-1 flex-col h-full bg-transparent border-2-black text-black">
        <CardTitle>
          <h1 className="text-xl">Upload a File</h1>
        </CardTitle>

        <CardContent className=" flex gap-2 flex-col h-full">
          <p>Upload a video to analize using Falcon AI</p>
          <Dropzone
            classNameWrapper="text-black h-[3 00px] flex justify-center items-center"
            dropMessage="Drop your video here"
            handleOnDrop={() => {}}
          />
          <div className="flex flex-row gap-2 justify-end">
            <Button>Retry upload</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
