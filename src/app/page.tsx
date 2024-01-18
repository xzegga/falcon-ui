"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WelcomeLanding() {
  const router = useRouter();
  return (
    <div className="h-[100%] flex flex-col justify-center items-center">
      <Image alt="ConcentrixCX" width={300} height={245} src="/assets/falcon.png" />
      <h1 className="text-4xl font-bold text-sky-900 text-center">Welcome to</h1>

      <h2 className="text-6xl font-bold text-sky-900 text-center mb-10">Falcon AI</h2>
      
      <Button onClick={() => router.push(`/client/`)} >Start new Survey</Button>

      <div className="flex gap-2 justify-center pt-10 items-center">
        <div className="w-[100px]">Powered by</div>
        <Image alt="ConcentrixCX" width={150} height={35} src="/assets/concentrixwh-head.svg" />
      </div>
    </div>
  )
}