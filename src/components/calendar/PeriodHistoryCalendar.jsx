import React, { useCallback, useMemo, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import ImportFromScreenshot from "@/components/calendar/ImportFromScreenshot";
import { groupBleedingDays } from "@/lib/cycle";

// yyyy-MM-dd, built from local parts so days never shift by a timezone offset.
const formatDay = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// Every calendar day a log covers: start_date through end_date.
const expandLog = (log) => {
  const days = [];
  const end = new Date(log.end_date || log.start_date);
  for (let d = new Date(log.start_date); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};

export default function PeriodHistoryCalendar({ logs, onSaved }) {
  const [days, setDays] = useState([]);
  const daysRef = useRef([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Keeps the ref in step with the selection so several screenshots imported
  // in one go build on each other instead of overwriting one another.
  const selectDays = (next) => {
    daysRef.current = next;
    setDays(next);
  };

  const today = new Date();
  const historyStart = new Date(today.getFullYear(), today.getMonth() - 11, 1);

  const loggedDays = useMemo(() => logs.flatMap(expandLog), [logs]);
  const loggedKeys = useMemo(
    () => new Set(loggedDays.map(formatDay)),
    [loggedDays]
  );

  // Adds the days read from an imported screenshot, skipping anything already there.
  const mergeImported = (values) => {
    const current = daysRef.current;
    const keys = new Set(current.map(formatDay));
    const next = [...current];
    values.forEach((value) => {
      const date = new Date(`${value}T00:00:00`);
      const key = formatDay(date);
      if (date > today || loggedKeys.has(key) || keys.has(key)) return;
      keys.add(key);
      next.push(date);
    });
    selectDays(next);
    return next.length - current.length;
  };

  // Opens on the most recent month, with the earlier months scrolled above it.
  // A stable callback so it only runs when the container mounts — otherwise
  // every re-render (each day you tap) would snap the view back down.
  const scrollToLatest = useCallback((node) => {
    if (node) node.scrollTop = node.scrollHeight;
  }, []);

  const handleSave = async () => {
    if (!days.length) return;
    setSaving(true);
    setError("");
    try {
      const runs = groupBleedingDays(days.map(formatDay));
      await base44.entities.CycleLog.bulkCreate(
        runs.map((run) => ({ ...run, flow_intensity: "medium" }))
      );
      selectDays([]);
      onSaved();
    } catch (e) {
      setError(e?.message || "Couldn't save your days. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <ImportFromScreenshot onImported={mergeImported} />

      <div className="rounded-3xl border border-slate-100 bg-white p-1 sm:p-3">
        <div
          ref={scrollToLatest}
          className="max-h-[23rem] overflow-y-auto rounded-2xl"
        >
          <Calendar
            mode="multiple"
            selected={days}
            onSelect={(value) => selectDays(value || [])}
            numberOfMonths={12}
            defaultMonth={historyStart}
            disabled={[{ after: today }, ...loggedDays]}
            modifiers={{ logged: loggedDays }}
            classNames={{
              months: "flex flex-col items-center",
              month: "w-full space-y-3",
              head_row: "flex w-full",
              head_cell:
                "flex-1 font-normal text-[0.8rem] text-muted-foreground",
              row: "flex w-full mt-1",
              cell: "relative flex-1 p-0 text-center text-sm",
              day: "inline-flex h-11 w-full items-center justify-center rounded-full p-0 text-sm font-normal hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-selected:opacity-100",
              day_selected:
                "bg-pomegranate-600 text-primary-foreground hover:bg-pomegranate-600 focus:bg-pomegranate-600",
              day_logged:
                "bg-pomegranate-200/70 font-medium text-pomegranate-900",
              day_today: "font-semibold",
            }}
            className="w-full p-3"
          />
        </div>

        {error && (
          <p className="px-4 pt-2 text-sm text-destructive">{error}</p>
        )}

        <div className="flex items-center gap-3 px-4 py-3">
          <span className="flex-1 text-sm text-slate-500">
            {days.length > 0 &&
              `${days.length} day${days.length === 1 ? "" : "s"} selected`}
          </span>
          <Button
            onClick={handleSave}
            disabled={!days.length || saving}
            className="rounded-full bg-pomegranate-600 px-6 hover:bg-pomegranate-700"
          >
            {saving ? "Saving…" : "Save days"}
          </Button>
        </div>
      </div>
    </div>
  );
}