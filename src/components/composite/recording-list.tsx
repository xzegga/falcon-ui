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
import GaugeChart from "./gaugeChart";
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
                <div className="flex flex-row w-full items-center justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-primary-main text-lg font-semibold">
                      {item.title}
                    </span>
                    <div className="text-xs text-secondary-600">
                      <Moment format="hh:mm - DD/MM/YYYY">
                        {item.created_at}
                      </Moment>
                    </div>
                  </div>
                  <TrashIcon
                    className="w-5 h-5 stroke-red-600 hover:stroke-red-700"
                    onClick={deleteSurvey(item.survey_id)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full wrap items-start">
              <div className="flex items-center w-full mt-1 justify-between gap-2">
                <Badge variant={getBadgeVariantFromLabel(item["status"])}>
                  {item["status"].toUpperCase()}
                </Badge>
              </div>
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
