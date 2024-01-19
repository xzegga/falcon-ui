import type { Metadata } from "next";
import "../globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
    title: "Falcon Ai",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="flex flex-col h-[100vh]  mt-14">
                {children}
            </div>
        </>
    );
}