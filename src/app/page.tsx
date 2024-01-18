"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="h-[100%] flex flex-col justify-center items-center">
      <div className="mb-15">
        <Image alt="ConcentrixCX" width={300} height={69} src="/assets/concentrixwh-head.svg" />
      </div>

      <div className="flex">
        <div className="mr-10">
          <Image alt="ConcentrixCX" width={512} height={508} src="/assets/intro.png" />
        </div>
        <div className="h-[100%] flex flex-col justify-center">
          <div className="flex flex-col">
            <div className="text-base max-w-[580px]">
              <div className="pb-3">We value your feedback and would like to know how likely you are to recommend our product/service to a friend or colleague. Your input is crucial in helping us improve and provide you with the best possible experience.</div>
              <div className="pb-3">Please take a moment to rate your likelihood to recommend us on a scale of 1 to 10, where 0 means "Not at all likely" and 10 means "Extremely likely." Additionally, we appreciate any comments or suggestions you may have to help us better understand your rating.</div>
              <div className="pb-3">Your honest feedback is important to us and will contribute to our ongoing efforts to enhance our offerings. Thank you for your time and continued support!</div>
            </div>
          </div>
          <div className="mt-8">
            <div>
              {Array.from({ length: 11 }, (_, i) => i).map((i) => {
                const ratio = i / 10;
                const red = Math.round(207 - 129 * ratio); // Adjusted red component for reverse gradient
                const green = Math.round(45 + 121 * ratio); // Adjusted green component for reverse gradient
                const blue = 83; // Adjusted blue component for #4EAE53
                const opacity = 0.1; // 10% opacity
                const bgcolor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
                const color = `rgb(${red}, ${green}, ${blue})`;

                return (
                  <Button
                    key={i}
                    onClick={() => router.push("/client/record-feedback")}
                    className="py-2 px-[15px] rounded mr-1 border font-bold text-xl"
                    style={{ backgroundColor: bgcolor, borderColor: color, color: color }}
                  >
                    {i}
                  </Button>
                );
              })}

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
