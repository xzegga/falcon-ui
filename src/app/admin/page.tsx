import React from 'react'
import { ResizableBaseLayout } from "@/components/composite/resizable-base-layout";

export default function admin({children}: {children: React.ReactNode}) {
  return (
    <ResizableBaseLayout>{children}</ResizableBaseLayout>
  )
}