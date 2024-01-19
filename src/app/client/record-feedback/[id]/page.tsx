"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Disclaimer from "@/components/composite/disclaimer";
import ScreenEmotions from "@/components/composite/screenEmotions";
import Image from "next/image";

export default function LandingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    return (
        <>
            <Image alt="ConcentrixCX" width={300} height={69}
                src="/assets/concentrixwh-head.svg"
                className="mx-auto mt-20" />
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
        </>

    );
}
