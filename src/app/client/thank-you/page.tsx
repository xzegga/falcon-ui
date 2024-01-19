"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ThankYou() {
    const router = useRouter();
    return (
        <div className="h-[100%] flex flex-col justify-center items-center w-[650px] mx-auto">
            <Image alt="ConcentrixCX" width={300} height={245} src="/assets/falcon.png" />

            <h2 className="text-6xl font-bold text-sky-900 text-center mb-10">Thank you for your response!</h2>

            <div className="pb-10 text-justify">
                <div className="pb-4">We appreciate you taking the time to share your thoughts with us. Your feedback is invaluable and will aid us in making improvements to better serve you. We are committed to delivering the best possible experience, and your input plays a crucial role in achieving that goal.</div>
                <div className="pb-4">If you have any additional comments or suggestions, please feel free to share them with us. Your satisfaction is our priority, and we look forward to continuing to meet and exceed your expectations.</div>
                <div className="pb-4">Thank you once again for choosing us and for helping us strive for excellence!</div>
            </div>
            <div>
                <a
                    href="https://www.concentrix.com/"
                    className="bg-sky-900 text-white font-semibold py-2 px-6 rounded-full flex items-center hover:bg-sky-800">
                    <span>Back to concentrix.com</span>
                </a>
            </div>
            <div className="flex gap-2 justify-center pt-10 items-center">
                <div className="w-[100px]">Powered by</div>
                <Image alt="ConcentrixCX" width={150} height={35} src="/assets/concentrixwh-head.svg" />
            </div>
        </div >
    )
}