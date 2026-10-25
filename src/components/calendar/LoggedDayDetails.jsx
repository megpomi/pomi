import React from "react";
import { Droplet } from "lucide-react";
import { prettySymptom } from "@/lib/dailyLog";

const FLOW_LABEL = { light: "Light", medium: "Medium", heavy: "Heavy" };
const MOOD_EMOJI = {
  great: "😊",
  good: "🙂",
  okay: "😐",
  low: "😔",
  anxious: "😰",
};

const prettyDate = (d) =>
  d
    ? d.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

export default function LoggedDayDetails({ date, log, cycleDay }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-heading text-lg font-semibold text-slate-800">
          {prettyDate(date)}
        </h3>
        {cycleDay ? (
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-pomegranate-700">
            Day {cycleDay} of your cycle
          </span>
        ) : null}
      </div>

      {!log ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Droplet className="h-4 w-4 text-pomegranate-200" />
          Nothing logged for this day.
        </p>
      ) : (
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <p>
            <span className="text-slate-400">Flow: </span>
            {FLOW_LABEL[log.flow_intensity] || "—"} flow
          </p>
          {log.mood && (
            <p>
              <span className="text-slate-400">Mood: </span>
              {MOOD_EMOJI[log.mood]} {log.mood}
            </p>
          )}
          {log.symptoms?.length > 0 && (
            <div>
              <span className="text-slate-400">Symptoms: </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {log.symptoms.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-pomegranate-50 px-3 py-1 text-xs capitalize text-pomegranate-700"
                  >
                    {prettySymptom(s)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {log.notes && (
            <p className="rounded-2xl bg-slate-50 p-4 text-slate-500">
              {log.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}