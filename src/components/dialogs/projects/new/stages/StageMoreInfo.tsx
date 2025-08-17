"use client";

import { DateRange, DateRangeInput, DateRangePicker, Input, Textarea } from "@once-ui-system/core";
import { PublicSafeUser } from "@/lib/types/User";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function StageMoreInfo({
  user,

  dateRange,
  setDateRange,

  projectUrl,
  setProjectUrl,

  locationType,
  setLocationType,
}: {
  user: PublicSafeUser;

  dateRange: DateRange,
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>,

  projectUrl: string;
  setProjectUrl: React.Dispatch<React.SetStateAction<string>>;

  locationType: string;
  setLocationType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [inputErrors, setInputErrors] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      {/* DATE RANGE */}

      <Card className="!pt-4">
        <CardContent>
          <Label> Duration </Label>
          <div className="flex gap-4 justify-start">
            <div>
              <DateRangePicker
                value={dateRange}
                onChange={(range) => setDateRange(range)}
              />
            </div>

            <div className="flex flex-col gap-2 grow">
              <p className="font-medium"> Dates </p>
              <div 
                className="!pl-4 py-3 border border-border rounded-lg text-muted-foreground"
              >
                {dateRange.startDate?.toDateString() || "None"}
              </div>

              <div 
                className="!pl-4 py-3 border border-border rounded-lg text-muted-foreground"
              >
                {dateRange.endDate?.toDateString() || "None"}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* PROJECT URL */}
      <div>
        <Label> Project URL </Label>
        <div className="flex items-center gap-2">
          <Input
            hasPrefix={<LinkIcon className="text-muted-foreground ml-4" size={14} />}
            id="project-url"
            type="url"
            placeholder="https://example.com"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            aria-invalid={inputErrors.includes("projectUrl") ? "true" : "false"}
          />
        </div>
      </div>

      {/* LOCATION TYPE */}
      <div>
        <Label> Location Type </Label>
        <div className="flex items-center gap-2">

          <Input
            hasPrefix={<MapPinIcon className="text-muted-foreground ml-4" size={14} />}
            id="location-type"
            placeholder="Remote, Hybrid, On-site..."
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            aria-invalid={inputErrors.includes("locationType") ? "true" : "false"}
          />
        </div>
      </div>
    </div>
  );
}
