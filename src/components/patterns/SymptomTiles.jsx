import React from "react";

// The month's symptom totals as a grid of numbers, the ones logged most first.
export default function SymptomTiles({ symptoms, monthLabel }) {
  if (symptoms.length === 0) {
    return (
      <p className="rounded-2xl bg-pomegranate-50 p-4 text-sm text-pomegranate-700">
        No symptoms logged in {monthLabel}.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {symptoms.map((symptom) => (
        <div
          key={symptom.key}
          className="rounded-2xl bg-pomegranate-50/70 px-3 py-3 text-center"
        >
          <p className="font-heading text-xl font-semibold text-pomegranate-700">
            {symptom.count}
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-slate-500">
            {symptom.label}
          </p>
        </div>
      ))}
    </div>
  );
}