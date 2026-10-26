import React from "react";
import { TRACKING_OPTIONS } from "@/lib/tracking";
import ChoiceCard from "@/components/onboarding/ChoiceCard";

export default function TrackingPreferences({ selected, onChange }) {
  const toggle = (value) =>
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <h2 className="font-heading text-lg font-semibold text-slate-800">
        What I'm tracking
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Pick every area you want Pomi to follow — this shapes your insights and
        the symptoms you're prompted for.
      </p>

      <div className="mt-4 space-y-3">
        {TRACKING_OPTIONS.map((opt) => (
          <ChoiceCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            desc={opt.desc}
            active={selected.includes(opt.value)}
            comingSoon={opt.comingSoon}
            onClick={() => toggle(opt.value)}
          />
        ))}
      </div>
    </section>
  );
}