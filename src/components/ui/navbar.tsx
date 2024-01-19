"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function Navba(){
  const router = useRouter();
  return (
    <nav
      className="fixed preflight z-40 flex h-12 w-full items-center gap-2 bg-gray-500 px-2 text-white cursor-pointer"
      data-te-navbar-ref
      onClick={() => router.push("/")}
    >
        <Image alt="ConcentrixCX" width={145} height={45} src="/assets/cnx-logo.png"/> | <h1 className="text-xl text-[#E7E8EA]">Falcon<span className="font-bold text-white">AI</span></h1>
    </nav>
  );
};

