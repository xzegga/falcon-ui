"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Assistant from "@/components/ui/dialog";
import Disclaimer from "@/components/composite/disclaimer";
import { useSurvey } from "@/lib/db";
import ScreenEmotions from "@/components/composite/screenEmotions";

export default function LandingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    return (
        <div className="h-[100%] flex flex-col justify-center items-center">
            <div className="flex items-center justify-stretch pt-20 bg-[url('/assets/careers-group.png')] 
                bg-no-repeat bg-contain bg-right pr-30 gap-5">
                <div className="mr-10 flex-auto">
                    <Disclaimer />
                </div>
                <div className="h-[450px] w-[550px] flex flex-col justify-end items-end">
                    <div className="text-base max-w-[600px]">
                        <ScreenEmotions id={params.id} />
                    </div>
                </div>
            </div>

        </div >
    );
}
