import React from "react";
import { TrendingUp } from "lucide-react";
import MoodTrendChart from "@/components/patterns/MoodTrendChart";
import SymptomTrendChart from "@/components/patterns/SymptomTrendChart";

const MOOD_SCORE = { anxious: 1, low: 2, okay: 3, good: 4, great: 5 };
const DAYS_SHOWN = 10;

// One point per day the user logged something — a period day or a daily
// check-in — oldest to newest, so the charts always show the latest data.
const toDayData = (logs, dailyLogs) => {
  const byDay = new Map();

  const add = (date, mood, symptoms) => {
    const key = String(date || "").slice(0, 10);
    if (!key) return;
    const day = byDay.get(key) || { mood: null, symptoms: 0 };
    byDay.set(key, {
      mood: MOOD_SCORE[mood] ?? day.mood,
      symptoms: Math.max(day.symptoms, symptoms),
    });
  };

  logs.forEach((log) =>
    add(log.start_date, log.mood, log.symptoms?.length || 0)
  );
  dailyLogs.forEach((entry) =>
    add(entry.date, entry.mood, entry.symptoms?.length || 0)
  );

  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-DAYS_SHOWN)
    .map(([key, day]) => ({
      label: new Date(`${key}T00:00:00`).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      ...day,
    }));
};

export default function CyclePatterns({ logs, dailyLogs = [] }) {
  const data = toDayData(logs, dailyLogs);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <div className="mb-1 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-pomegranate-400" />
        <h2 className="font-heading text-lg font-semibold text-slate-800">
          Your patterns
        </h2>
      </div>
      <p className="mb-5 text-sm text-slate-500">
        How you felt and what you logged on your most recent days.
      </p>

      {data.length < 2 ? (
        <p className="rounded-2xl bg-pomegranate-50 p-4 text-sm text-pomegranate-700">
          Log a few more days and your trends will appear here.
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