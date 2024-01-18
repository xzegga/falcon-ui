import { LucideIcon } from "lucide-react";
import React from "react";

export default function EmotionAnalysisLabel({
  message,
  color,
  icon,
}: {
  message: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={`p-2 border-2 border-${color}-500 bg-${color}-50 text-${color}-800 flex gap-3 justify-center`}>
      {icon}
      {message}
    </div>
  );
}
