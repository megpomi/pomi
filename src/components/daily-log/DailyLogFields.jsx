import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  FLOW_OPTIONS,
  MOOD_OPTIONS,
  SYMPTOM_OPTIONS,
  prettySymptom,
} from "@/lib/dailyLog";

export function FlowPicker({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label>Flow</Label>
      <div className="flex gap-2">
        {FLOW_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-sm transition ${
              value === option.value
                ? "border-pomegranate-400 bg-pomegranate-50 text-pomegranate-700"
                : "border-slate-200 text-slate-600 hover:border-pomegranate-200"
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${option.dot}`} />
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MoodPicker({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label>Mood</Label>
      <div className="flex gap-2">
        {MOOD_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            onClick={() => onChange(value === option.value ? "" : option.value)}
            className={`flex-1 rounded-xl border px-2 py-2 text-xl transition ${
              value === option.value
                ? "border-pomegranate-400 bg-pomegranate-50"
                : "border-slate-200 hover:border-pomegranate-200"
            }`}
          >
            {option.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SymptomPicker({ value, onChange }) {
  const toggle = (symptom) =>
    onChange(
      value.includes(symptom)
        ? value.filter((item) => item !== symptom)
        : [...value, symptom]
    );

  return (
    <div className="space-y-2">
      <Label>Symptoms</Label>
      <div className="flex flex-wrap gap-2">
        {SYMPTOM_OPTIONS.map((symptom) => {
          const active = value.includes(symptom);
          return (
            <button
              key={symptom}
              type="button"
              onClick={() => toggle(symptom)}
              className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${
                active
                  ? "border-pomegranate-400 bg-pomegranate-50 text-pomegranate-700"
                  : "border-slate-200 text-slate-600 hover:border-pomegranate-200"
              }`}
            >
              {prettySymptom(symptom)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SexToggle({ value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="had-sex">Had sex today</Label>
      <Switch
        id="had-sex"
        checked={value}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-pomegranate-600"
      />
    </div>
  );
}