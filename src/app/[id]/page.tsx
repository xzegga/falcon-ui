"use client";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
  Video,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ScreenEmotions from "../../components/composite/screenEmotions";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RecordingView({ params }: { params: { id: string } }) {
  // Just to emulate db
  const today = new Date();
  const recordings = [
    {
      id: "c815cb17-2634-409e-9c3f-56ac1de5f222",
      title: "Did you got the assistance you needed?",
      transcription:
        "Yes, I got the assistance I needed. I am very happy with the service provided by the agent. I would like to give a 5 star rating to the agent. Thank you.",
      type: "video",
      source: "file",
      created_at: `${today.getHours()}:${today.getMinutes()}`,
    },
    {
      id: "484f4749-e366-474f-be17-fab60d07beb9",
      title: "Opinion on the new product",
      transcription:
        "I am very happy with the new product. I would like to give a 5 star rating to the agent. Thank you.",
      type: "video",
      source: "live",
      created_at: `${today.getHours()}:${today.getMinutes()}`,
    },
    {
      id: "484f4749-e366-474f-be17-fab60d05beb0",
      title: "By WebCam",
      transcription:
        "capturing from WebCam.",
      type: "video",
      source: "webcam",
      created_at: `${today.getHours()}:${today.getMinutes()}`,
    },
  ];
  const recording = recordings.find((recording) => recording.id === params.id);

  return (
    <div className="flex h-full flex-col">
      {recording ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-center gap-4 text-sm">
             <Video className="h-6 w-6 content-center" />
              <div className="grid gap-1 content-center justify-items-center">
                <div className="font-semibold">{recording.title}</div>
              </div>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!recording}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Move to trash</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move to trash</TooltipContent>
              </Tooltip>
            </div>
            {recording?.created_at && (
              <div className="ml-auto text-xs text-muted-foreground">
                {recording.created_at}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex p-4">
          {recording.source==='webcam' ? <ScreenEmotions />:<video controls>
                <source src="https://tmilqubytvbtzbohphiq.supabase.co/storage/v1/object/public/recordings/placeholder.mp4"/>
            </video>}
            
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {recording?.transcription}
          </div>
          <Separator className="mt-auto" />
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
