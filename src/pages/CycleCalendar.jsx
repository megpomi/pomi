import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import pomiLogo from "@/assets/pomi-logo.png";
import { Calendar } from "@/components/ui/calendar";
import LoggedDayDetails from "@/components/calendar/LoggedDayDetails";

const dayKey = (value) => {
  const d = new Date(value);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// Every calendar day a log covers: start_date through end_date (a single day when open).
const expandLog = (log) => {
  const days = [];
  const end = new Date(log.end_date || log.start_date);
  for (let d = new Date(log.start_date); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};

export default function CycleCalendar() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Date());

  useEffect(() => {
    base44.entities.CycleLog.filter({}, { sort: "-start_date", limit: 200 })
      .then((res) => setLogs(res.items))
      .finally(() => setLoading(false));
  }, []);

  const loggedDays = useMemo(() => logs.flatMap(expandLog), [logs]);

  const selectedLog = useMemo(() => {
    if (!selected) return null;
    const key = dayKey(selected);
    return (
      logs.find((l) => {
        const start = dayKey(l.start_date);
        const end = dayKey(l.end_date || l.start_date);
        return key >= start && key <= end;
      }) || null
    );
  }, [logs, selected]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-pomegranate-100/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Image
            src={pomiLogo}
            alt="Pomi"
            className="h-14 w-14"
            fittingType="fit"
          />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-pomegranate-600 hover:text-pomegranate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to my cycle
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <h1 className="font-heading text-3xl font-semibold text-slate-800 sm:text-4xl">
          Your calendar
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Every day you've logged, in one place. Tap a day to see what you
          recorded.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-1 sm:p-3">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(value) => value && setSelected(value)}
            modifiers={{ logged: loggedDays }}
            disabled={{ after: new Date() }}
            classNames={{
              months: "flex flex-col items-center",
              month: "w-full space-y-3",
              head_row: "flex w-full",
              head_cell:
                "flex-1 font-normal text-[0.8rem] text-muted-foreground",
              row: "flex w-full mt-1",
              cell: "relative flex-1 p-0 text-center text-sm",
              day: "inline-flex h-11 w-full items-center justify-center rounded-full p-0 text-sm font-normal hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-selected:opacity-100",
              day_logged:
                "bg-pomegranate-200/70 font-medium text-pomegranate-900 hover:bg-pomegranate-200",
              day_selected:
                "bg-pomegranate-600 text-primary-foreground hover:bg-pomegranate-600 focus:bg-pomegranate-600",
              day_today: "font-semibold",
            }}
            className="w-full p-3"
          />

          <div className="flex items-center gap-2 px-4 pb-3 text-xs text-slate-500">
            <span className="h-3 w-3 rounded-full bg-pomegranate-200" />
            Day you logged a period
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="h-32 animate-pulse rounded-3xl bg-white" />
          ) : (
            <LoggedDayDetails date={selected} log={selectedLog} />
          )}
        </div>
      </main>
    </div>
  );
}