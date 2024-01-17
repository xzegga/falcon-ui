"use client";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface RecordingListProps {
  items: any[];
}

export function RecordingList({ items }: RecordingListProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <Link key={item.id} href={`/${item.id}`}>
            <button
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent w-full"
              )}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.title}</div>
                  </div>
                  <div
                    className={cn("ml-auto text-xs", "text-muted-foreground")}
                  >
                    {item.created_at}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item?.transcription?.substring(0, 300)}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getBadgeVariantFromLabel(item.type)}>
                  {item.type.toUpperCase()}
                </Badge>
                <Badge variant={getBadgeVariantFromLabel(item.source)}>
                  {item.source.toUpperCase()}
                </Badge>
              </div>
            </button>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["video", "live"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["audio", "file"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
