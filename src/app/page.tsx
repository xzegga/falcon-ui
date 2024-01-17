"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="h-[100%] flex flex-col justify-center items-center">
      <h1 className="text-3xl text-secondary-800 my-8 font-bold">
        Tell us your feedback!
      </h1>
      <div className="text-lg w-2/4 text-justify border bg-white border-info-600 p-6">
        The following questions will ask you about your experiences with a wide
        variety of financial services firms. When answering the questions please
        consider all the various types of financial products and accounts you
        may have with financial services companies. <br />
        <br />
        Please click &quot;Begin Survey&quot; if you agree to spend a reasonable amount of
        time and attention in completing this survey and to provide honest and
        thoughtful responses.
      </div>
      <div className="w-2/4 mt-8 flex gap-4 justify-center">
        <Button
          onClick={() => router.push("/client/record-feedback")}
          className="py-2 px-4 rounded"
        >
          Record Feedback
        </Button>
        <Button
          onClick={() => router.push("/client/live-survey")}
          className="py-2 px-4 rounded"
        >
          Live Survey
        </Button>
        <Button
          onClick={() => router.push("/client/talk-carly")}
          className="py-2 px-4 rounded"
        >
          Talk to Carly
        </Button>
      </div>
    </div>
  );
}
