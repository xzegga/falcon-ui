"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Assistant from "@/components/ui/dialog";
import Disclaimer from "@/components/composite/disclaimer";

export default function LandingPage() {
    const router = useRouter();
    const [selected, setSelected] = React.useState<number | null>(null);
    const [showModal, setShowModal] = React.useState(false);

    const selectValue = (value: number) => {
        setSelected(value);
        setShowModal(true);
    };

    return (
        <div className="h-[100%] flex flex-col justify-center items-center">
            <Assistant showModal={showModal} setShowModal={setShowModal} />

            <div className="flex items-center justify-stretch pt-20">
                <div className="mr-10">
                    <Disclaimer />
                </div>
                <div className="h-[100%] flex flex-col justify-center">
                    <div className="mb-[60px] flex items-center justify-center">

                    </div>
                    <div className="flex flex-col">
                        <div className="text-base max-w-[580px]">

                        </div>
                    </div>
                    <div className="mt-12 items-center justify-center flex">
                        <div>
                       
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
