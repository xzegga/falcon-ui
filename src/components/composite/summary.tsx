import React from "react";

export default function Summary({ text }: { text: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-xl text-secondary-600">Summary</h1>
      <div className="mt-2 p-4 bg-white h-[420px] overflow-y-scroll">
        {text}
      </div>
    </div>
  );
}
