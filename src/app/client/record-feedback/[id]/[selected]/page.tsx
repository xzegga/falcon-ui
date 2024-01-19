"use client";
import React from "react";
import Disclaimer from "@/components/composite/disclaimer";
import ScreenEmotions from "@/components/composite/screenEmotions";
import Image from "next/image";
import { TopicValue } from "@/lib/topics";
import Topics from "@/components/composite/topics";

export default function LandingPage({ params }: { params: { id: string, selected: number } }) {
    const [topics, setTopics] = React.useState<Set<TopicValue>>();
    return (
        <>
            <Image alt="ConcentrixCX" width={300} height={69}
                src="/assets/concentrixwh-head.svg"
                className="mx-auto mt-10" />
            <div className="h-[100%] flex flex-col justify-center items-center">
                <div className="flex items-strech justify-around pr-4 bg-[url('/assets/careers-group.png')] 
                bg-no-repeat bg-contain bg-right pr-30 gap-3">
                    <div className="mr-10 flex-auto">
                        {!topics || topics?.size === 0 ? <Disclaimer /> : <Topics topics={topics} />}
                    </div>
                    <div className="h-[450px] w-[580px] mt-2 flex flex-col justify-end items-end">
                        <div className="text-base max-w-[600px]">
                            <ScreenEmotions id={params.id} selected={params.selected} topicsUtils={{ topics, setTopics }} />
                        </div>
                    </div>
                </div>

            </div >
        </>

    );
}
