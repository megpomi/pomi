import React from "react";
import { TrendingUp } from "lucide-react";
import MoodTrendChart from "@/components/patterns/MoodTrendChart";
import SymptomTrendChart from "@/components/patterns/SymptomTrendChart";

const MOOD_SCORE = { anxious: 1, low: 2, okay: 3, good: 4, great: 5 };
const CYCLES_SHOWN = 6;

// One point per logged cycle, oldest to newest.
const toCycleData = (logs) =>
  [...logs]
    .sort((a, b) => String(a.start_date).localeCompare(String(b.start_date)))
    .slice(-CYCLES_SHOWN)
    .map((log) => ({
      label: new Date(log.start_date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      mood: MOOD_SCORE[log.mood] ?? null,
      symptoms: log.symptoms?.length || 0,
    }));

export default function CyclePatterns({ logs }) {
  const data = toCycleData(logs);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <div className="mb-1 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-pomegranate-400" />
        <h2 className="font-heading text-lg font-semibold text-slate-800">
          Your patterns
        </h2>
      </div>
      <p className="mb-5 text-sm text-slate-500">
        How you felt and what you logged across your last cycles.
      </p>

      {data.length < 2 ? (
        <p className="rounded-2xl bg-pomegranate-50 p-4 text-sm text-pomegranate-700">
          Log a couple more cycles and your trends will appear here.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-pomegranate-700">
              Mood
            </p>
            <MoodTrendChart data={data} />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-pomegranate-700">
              Symptoms logged
            </p>
            <SymptomTrendChart data={data} />
          </div>
        </div>
      )}
    </div>
  );
}