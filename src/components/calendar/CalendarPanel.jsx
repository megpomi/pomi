import React, { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import CalendarDay from "@/components/calendar/CalendarDay";
import LoggedDayDetails from "@/components/calendar/LoggedDayDetails";
import { getCycleDay } from "@/lib/cycle";

// yyyy-MM-dd, built from local parts so days never shift by a timezone offset.
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

// The month calendar with a dot on every day that has data, plus the details of
// the day you tap. `title`/`action` fill an optional header row.
export default function CalendarPanel({ logs, loading, title, action }) {
  const [selected, setSelected] = useState(new Date());

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

  const cycleDay = useMemo(
    () => (selected ? getCycleDay(logs, selected) : null),
    [logs, selected]
  );

  return (
    <div>
      <div className="rounded-3xl border border-slate-100 bg-white p-1 sm:p-3">
        {(title || action) && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-1 pt-3">
            {title && (
              <h3 className="font-heading text-lg font-semibold text-slate-800">
                {title}
              </h3>
            )}
            {action}
          </div>
        )}

        <Calendar
          mode="single"
          selected={selected}
          onSelect={(value) => value && setSelected(value)}
          modifiers={{ logged: loggedDays }}
          components={{ DayContent: CalendarDay }}
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
          <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-pomegranate-200/70">
            <span className="h-1 w-1 rounded-full bg-pomegranate-600" />
          </span>
          Day with logged data — tap to view
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="h-32 animate-pulse rounded-3xl bg-white" />
        ) : (
          <LoggedDayDetails date={selected} log={selectedLog} cycleDay={cycleDay} />
        )}
      </div>
    </div>
  );
}