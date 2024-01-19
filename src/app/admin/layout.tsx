import React from "react";
import { ResizableBaseLayout } from "@/components/composite/resizable-base-layout";
import Navbar from "@/components/ui/navbar";

export default function admin({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <ResizableBaseLayout>{children}</ResizableBaseLayout>
    </>
  );
}
