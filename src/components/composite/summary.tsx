import React from "react";

export default function Summary({text}: {text: string}) {
  return <div className="w-2/3">
    <h1 className="text-xl text-secondary-600">Summary</h1>
    <div className="mt-2 p-4 border-2 bg-white border-secondary-500">{text}</div>
  </div>;
}
