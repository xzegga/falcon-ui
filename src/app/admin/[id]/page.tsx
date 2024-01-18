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
import ScreenEmotions from "../../../components/composite/screenEmotions";
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
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useSurvey } from "@/lib/db";

export default function RecordingView({ params }: { params: { id: string } }) {
  const {
    loadingdb,
    resultdb: resultdbbyid,
    errordb,
    get,
  } = useSurvey() as any;
  useEffect(() => {
    get(params.id);
  }, []);

  return (
    <>
      <div className="">
        <div className="flex flex-row">
          <div className="w-1/2">
          {resultdbbyid.type === "webcam" ? (
                <ScreenEmotions id={uuidv4()} />
              ) : (
                <video controls>
                  <source
                    src={`https://tmilqubytvbtzbohphiq.supabase.co/storage/v1/object/public/recordings/${resultdbbyid?.survey_id}`}
                  />
                </video>
              )}
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>

      <div className="flex h-full flex-col">
        {resultdbbyid ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-center gap-4 text-sm">
                <Video className="h-6 w-6 content-center" />
                <div className="grid gap-1 content-center justify-items-center">
                  <div className="font-semibold">{resultdbbyid.title}</div>
                </div>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" disabled={!resultdbbyid}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Move to trash</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move to trash</TooltipContent>
                </Tooltip>
              </div>
              {resultdbbyid?.created_at && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {resultdbbyid.created_at}
                </div>
              )}
            </div>
            <Separator />
            <div className="flex p-4">
              
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
              {resultdbbyid?.status}
            </div>
            <Separator className="mt-auto" />
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No message selected
          </div>
        )}
      </div>
    </>
  );
}
