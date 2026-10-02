import React from "react";
import { Droplet } from "lucide-react";

const FLOW_DOT = {
  light: "bg-pomegranate-200",
  medium: "bg-pomegranate-400",
  heavy: "bg-pomegranate-600",
};

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

export default function CycleHistory({ logs, loading }) {
  const items = [...logs]
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 6);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <h3 className="mb-5 font-heading text-lg font-semibold text-slate-800">
        Recent cycles
      </h3>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-50" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Droplet className="mb-3 h-8 w-8 text-pomegranate-200" />
          <p className="text-sm text-slate-500">
            No periods logged yet. Add your first to begin.
          </p>
        </div>
      ) : (
        <ol className="relative space-y-1">
          {items.map((l, i) => (
            <li
              key={l.id}
              className="flex items-center gap-4 rounded-2xl px-2 py-3 transition hover:bg-pomegranate-50/40"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  FLOW_DOT[l.flow_intensity] || "bg-pomegranate-300"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">
                  {fmt(l.start_date)}
                  {l.end_date && (
                    <span className="text-slate-400"> — {fmt(l.end_date)}</span>
                  )}
                </p>
                <p className="text-xs capitalize text-slate-400">
                  {l.flow_intensity} flow
                  {l.symptoms?.length
                    ? ` · ${l.symptoms.length} symptom${
                        l.symptoms.length > 1 ? "s" : ""
                      }`
                    : ""}
                </p>
              </div>
              {l.mood && <span className="text-lg">{moodEmoji(l.mood)}</span>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function moodEmoji(m) {
  return { great: "😊", good: "🙂", okay: "😐", low: "😔", anxious: "😰" }[m] || "";
}