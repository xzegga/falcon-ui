"use client";
import { ComponentProps, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Moment from "react-moment";
import { useSurvey } from "@/lib/db";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface RecordingListProps {
  items: any[];
}

export function RecordingList({ items }: RecordingListProps) {
  const { remove } = useSurvey() as { remove: (id: string) => {} };
  const router = useRouter();

  const deleteSurvey = (id: string) => (evt: MouseEvent) => {
    evt.preventDefault();
    remove(id);
    router.push("/admin");
  };

  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      {items.map((item) => (
        <Link key={item.survey_id} href={`/admin/${item.survey_id}`}>
          <div
            className={cn(
              "flex flex-col items-start gap-2 rounded border-white border-2 p-3 text-left text-sm transition-all hover:border-primary-main hover:border-2 w-full bg-gray-50"
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-primary-main text-lg font-semibold">
                    {item.title}
                  </div>
                </div>
              </div>
              <div className="text-xs text-secondary-600">
                <Moment format="hh:mm - DD/MM/YYYY">{item.created_at}</Moment>
              </div>
            </div>
            <div className="flex justify-between w-full wrap items-start">
              <div className="flex items-center mt-1 gap-2">
                <Badge variant={getBadgeVariantFromLabel(item["status"])}>
                  {item["status"].toUpperCase()}
                </Badge>
              </div>
              <Button
                variant={"outline"}
                onClick={deleteSurvey(item.survey_id)}
                size={"sm"}
                className="rounded-sm bg-transparent text-red-600 border-red-600 border-2 hover:bg-red-600 hover:text-white"
              >
                <TrashIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
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
