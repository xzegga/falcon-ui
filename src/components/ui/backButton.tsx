import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Back() {
  const router = useRouter();
  return (
    <div className="pl-4">
      <ArrowLeft
        size={20}
        className="hover:cursor-pointer hover:stroke-[#00a0af]"
        onClick={() => router.back()}
      />
    </div>
  );
}
