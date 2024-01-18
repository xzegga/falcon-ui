"use client";
import React, { useRef, useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Dropzone from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine } from "lucide-react";

export default function FileUpload() {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileUpload = (evt: any) => {
    const newFiles = [...evt];
    setFileList(fileList.concat(newFiles));
  };

  const resetFileUpload = () => setFileList([]);

  const handleUpload = () => {};

  return (
    <div className="w-full p-4">
      <Card className="p-4 flex gap-1 flex-col h-full bg-transparent border-2-black text-black">
        <CardTitle>
          <p className="text-xl">Upload a File</p>
        </CardTitle>
        <CardContent className=" flex gap-2 flex-col h-full">
          <p>Upload a video to analize using Falcon AI</p>
          <div className="flex flex-row gap-2 flex-wrap">
            {fileList.map((file: File) => {
              return (
                <Card key={file.lastModified + file.name} className="file p-2">
                  {file.name}
                </Card>
              );
            })}
          </div>
          <Dropzone
            multiple
            classNameWrapper="text-black h-[3 00px] flex justify-center items-center"
            dropMessage="Drop your video here"
            handleOnDrop={handleFileUpload}
          />
          <div className="flex flex-row gap-2 justify-end">
            <Button variant="secondary" onClick={resetFileUpload}>
              Empty files
            </Button>
            <Button>
              Upload <ArrowUpFromLine className="h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
