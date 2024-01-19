import { useRef, useEffect, LegacyRef } from "react";

export default function Transcript({ transcript }: { transcript: string }) {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom when content is updated
        if (divRef.current && transcript !== "") {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }

    }, [transcript]);

    return (
        <div ref={divRef} className="w-full h-16 bg-black p-2.5 px-3
            rounded-xl mt-3 overflow-y-auto text-gray-50 font-base text-base">
            {transcript}
        </div>);
}