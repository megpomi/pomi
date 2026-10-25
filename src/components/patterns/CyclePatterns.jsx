import React, { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import MonthStepper from "@/components/patterns/MonthStepper";
import SymptomTiles from "@/components/patterns/SymptomTiles";
import {
  formatMonth,
  monthSeries,
  shiftMonth,
  startOfMonth,
  summarise,
  symptomBreakdown,
} from "@/lib/patterns";

const SECTION_LABEL =
  "mb-2 text-xs font-medium uppercase tracking-[0.12em] text-pomegranate-700";

// The month-by-month view of what the user logged: the present month on open,
// with the stepper walking back through earlier ones.
export default function CyclePatterns({ logs, dailyLogs = [] }) {
  const thisMonth = startOfMonth(new Date());
  const [month, setMonth] = useState(thisMonth);

  const move = (delta) =>
    setMonth((current) => {
      const next = shiftMonth(current, delta);
      return next > thisMonth ? current : next;
    });

  const series = useMemo(
    () => monthSeries(logs, dailyLogs, month),
    [logs, dailyLogs, month]
  );
  const stats = useMemo(() => summarise(series), [series]);
  const symptoms = useMemo(
    () => symptomBreakdown(logs, dailyLogs, month),
    [logs, dailyLogs, month]
  );
  const isThisMonth = month.getTime() === thisMonth.getTime();

  const tiles = [
    { label: "Symptom days", value: stats.symptomDays },
    { label: "Symptoms logged", value: stats.symptoms },
    { label: "Usual mood", value: stats.mood || "—" },
  ];

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-pomegranate-400" />
            <h2 className="font-heading text-lg font-semibold text-slate-800">
              Your symptom patterns
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            How you felt and what you logged, month by month.
          </p>
        </div>
        <MonthStepper
          month={month}
          onChange={move}
          canGoForward={!isThisMonth}
        />
      </div>

      {series.length === 0 ? (
        <p className="rounded-2xl bg-pomegranate-50 p-4 text-sm text-pomegranate-700">
          {isThisMonth
            ? "Nothing logged yet this month — your trends appear here as you check in."
            : `Nothing logged in ${formatMonth(month)}.`}
        </p>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-3 gap-3">
            {tiles.map((tile) => (
              <div
                key={tile.label}
                className="rounded-2xl bg-pomegranate-50/70 px-3 py-3 text-center"
              >
                <p className="font-heading text-xl font-semibold text-pomegranate-700">
                  {tile.value}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-slate-500">
                  {tile.label}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className={SECTION_LABEL}>Symptoms logged</p>
            <SymptomTiles
              symptoms={symptoms}
              monthLabel={formatMonth(month)}
            />
          </div>
        </>
      )}
    </div>
  );
}