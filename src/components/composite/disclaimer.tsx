"use client";
import { AlertTriangle } from "lucide-react";
import React from "react";

export default function Disclaimer({message}: {message: string}) {
  return <div className="flex px-4 w-full py-2 bg-warning-50 border-2 my-2 mx-4 border-warning-500 items-center text-warning-800 text-sm">
    <AlertTriangle className="inline-block mr-2 fill-[#e29400]" size={18}/>
    {message}
    </div>;
}
