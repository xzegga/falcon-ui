"use client";
import Disclaimer from "@/components/composite/disclaimer";
import Summary from "@/components/composite/summary";
import Back from "@/components/ui/backButton";
import React from "react";

export default function RecordFeedback() {
  return (
    <>
      <div className="flex items-center">
        <Back />
        <Disclaimer message="This is a disclaimer - Record Feedback" />
      </div>
      <div className="w-3/4 mx-auto">
        <Summary text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
      </div>
    </>
  );
}
