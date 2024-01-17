import React from "react";

const navbar = () => {
  return (
    <nav
      className="preflight relative flex h-12 w-full items-center bg-gray-500 px-2 text-white"
      data-te-navbar-ref
    >
        <h1 className="text-xl font-bold">Falcon AI</h1>
    </nav>
  );
};

export default navbar;
