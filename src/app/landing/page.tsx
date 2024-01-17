"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="h-[100%] flex flex-col justify-center items-center">
      <div className="w-1/3 text-justify border-2 bg-warning-50 border-warning-500 pt-4 p-6">
        <AlertTriangle className="pb-2 fill-[#ffc000]"/>
        The following questions will ask you about your experiences with a wide
        variety of financial services firms. When answering the questions please
        consider all the various types of financial products and accounts you
        may have with financial services companies. <br />
        <br />
        Please click "Begin Survey" if you agree to spend a reasonable amount of
        time and attention in completing this survey and to provide honest and
        thoughtful responses.
      </div>
      <div className="w-2/4 mt-8 flex gap-4 justify-center">
        <Button className="py-2 px-4 rounded">Record Feedback</Button>
        <Button className="py-2 px-4 rounded">Live Survey</Button>
        <Button className="py-2 px-4 rounded">Talk to Carly</Button>
      </div>
    </div>
  );
}
