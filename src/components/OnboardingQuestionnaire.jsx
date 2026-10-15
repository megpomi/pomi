import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Droplet, Flame, Baby, Heart, Check, ArrowRight } from "lucide-react";
import PomegranateLogo from "@/components/PomegranateLogo";

const OPTIONS = [
  {
    value: "menstrual_cycles",
    label: "Menstrual cycles",
    desc: "Track periods, flow, and predictions.",
    icon: Droplet,
  },
  {
    value: "perimenopause_menopause",
    label: "Perimenopausal or menopausal symptoms",
    desc: "Track hot flashes, sleep, and mood shifts.",
    icon: Flame,
  },
  {
    value: "pregnancy_postpartum",
    label: "Pregnancy or postpartum symptoms",
    desc: "Follow your journey and how you feel.",
    icon: Baby,
  },
  {
    value: "general_wellbeing",
    label: "General well-being",
    desc: "Track mood, energy, and everyday health.",
    icon: Heart,
  },
];

export default function OnboardingQuestionnaire({ onComplete }) {
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggle = (value) =>
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const handleContinue = async () => {
    if (!selected.length) return;
    setSaving(true);
    setError("");
    try {
      await base44.auth.updateMe({ tracking_focus: selected });
      onComplete(selected);
    } catch (e) {
      setError(e?.message || "Couldn't save your preferences. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf6f7] px-5 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <PomegranateLogo className="h-12 w-12" />
          <h1 className="mt-4 font-heading text-3xl font-semibold text-slate-800">
            What would you like to track?
          </h1>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Choose what matters to you — this shapes your personalized insights
            and cycle predictions.
          </p>
        </div>

        <div className="space-y-3">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-pomegranate-400 bg-pomegranate-50/70 ring-1 ring-pomegranate-300"
                    : "border-pomegranate-100 bg-white hover:border-pomegranate-200 hover:bg-pomegranate-50/40"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    active
                      ? "bg-pomegranate-500 text-white"
                      : "bg-pomegranate-50 text-pomegranate-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-slate-800">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-500">
                    {opt.desc}
                  </span>
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    active
                      ? "border-pomegranate-500 bg-pomegranate-500 text-white"
                      : "border-pomegranate-200"
                  }`}
                >
                  {active && <Check className="h-4 w-4" />}
                </span>
              </button>
            );
          })}
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <Button
          onClick={handleContinue}
          disabled={!selected.length || saving}
          className="mt-6 w-full rounded-full bg-pomegranate-600 py-6 text-base hover:bg-pomegranate-700"
        >
          {saving ? "Saving…" : "Continue"}
          {!saving && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}