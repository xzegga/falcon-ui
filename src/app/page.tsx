"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { set } from "date-fns";

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

                let red, green, blue;
              
                if (ratio <= 0.5) {
                  // Red to yellow 
                  red = Math.round(255); 
                  green = Math.round(255 * ratio * 2); // 0 to 255
                  blue = 0;
                } else {
                  // Yellow to green
                  red = Math.round(255 - 255 * (ratio - 0.5) * 2); // 255 to 0
                  green = 255; 
                  blue = 0;
                }
              
                const opacity = 0.1; // 10% opacity
              
                const bgcolor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
                const color = `rgb(${red}, ${green}, ${blue})`;

                return (
                  <Button
                    key={i}
                    onClick={() => selectValue(i)}
                    className={`py-2 px-[15px] rounded mr-2 border font-bold text-xs`}
                    style={{
                      backgroundColor: selected === i ? color : bgcolor, 
                      borderColor: color, 
                      color:  selected === i ? '#fff' : i >= 4 && i <= 6 ? "#bc6e00" : color
                    }}
                  >
                    {i}
                  </Button>
                );
              })}

            </div>
          </div>
        </div>
      </div>

    </div >
  );
}
