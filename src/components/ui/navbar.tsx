import Image from "next/image";
import React from "react";

const navbar = () => {
  return (
    <nav
      className="preflight relative flex h-12 w-full items-center gap-2 bg-gray-500 px-2 text-white"
      data-te-navbar-ref
    >
        <Image alt="ConcentrixCX" width={145} height={45} src="/assets/cnx-logo.png"/> | <h1 className="text-xl text-[#E7E8EA]">Falcon<span className="font-bold text-white">AI</span></h1>
    </nav>
  );
};

export default navbar;
