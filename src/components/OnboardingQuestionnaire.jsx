import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Image } from "@/components/ui/image";
import pomiLogo from "@/assets/pomi-logo.png";
import { CHARITY_OPTIONS } from "@/lib/charities";
import { TRACKING_OPTIONS } from "@/lib/tracking";
import ChoiceCard from "@/components/onboarding/ChoiceCard";
import IntroStep from "@/components/onboarding/IntroStep";
import SymptomHistoryStep from "@/components/onboarding/SymptomHistoryStep";

export default function OnboardingQuestionnaire({ onComplete }) {
  const [step, setStep] = useState(0);
  const [trackingFocus, setTrackingFocus] = useState([]);
  const [charityInterests, setCharityInterests] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggle = (setter) => (value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const allCharitiesSelected =
    charityInterests.length === CHARITY_OPTIONS.length;

  const toggleAllCharities = () =>
    setCharityInterests(
      allCharitiesSelected ? [] : CHARITY_OPTIONS.map((o) => o.value)
    );

  const handleContinue = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    setSaving(true);
    setError("");
    try {
      await base44.auth.updateMe({
        tracking_focus: trackingFocus,
        charity_interests: charityInterests,
      });
      setStep(3);
    } catch (e) {
      setError(e?.message || "Couldn't save your preferences. Please try again.");
    }
    setSaving(false);
  };

  const isFirst = step === 1;
  const options = isFirst ? TRACKING_OPTIONS : CHARITY_OPTIONS;
  const selected = isFirst ? trackingFocus : charityInterests;
  const toggleCurrent = toggle(isFirst ? setTrackingFocus : setCharityInterests);

  if (step === 0) {
    return <IntroStep onStart={() => setStep(1)} />;
  }

  if (step === 3) {
    return (
      <SymptomHistoryStep
        trackingFocus={trackingFocus}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src={pomiLogo}
            alt="Pomi"
            className="h-12 w-12"
            fittingType="fit"
          />
          <span className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-pomegranate-400">
            Step {step} of 3
          </span>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-slate-800">
            {isFirst
              ? "What would you like to track?"
              : "Which causes matter to you?"}
          </h1>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            {isFirst
              ? "Choose what matters to you — this shapes your personalised insights and symptoms predictions and can be updated at any point."
              : "A share of what Pomi earns is donated to these areas. Pick the ones you'd like to support directly."}
          </p>
        </div>

        <div className="space-y-3">
          {options.map((opt) => (
            <ChoiceCard
              key={opt.value}
              icon={opt.icon}
              label={opt.label}
              desc={opt.desc}
              active={selected.includes(opt.value)}
              onClick={() => toggleCurrent(opt.value)}
            />
          ))}
          {!isFirst && (
            <ChoiceCard
              icon={Sparkles}
              label="All of the above"
              active={allCharitiesSelected}
              onClick={toggleAllCharities}
            />
          )}
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-6 flex items-center gap-3">
          {!isFirst && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={saving}
              className="rounded-full border-pomegranate-200 px-5 text-pomegranate-600 hover:bg-pomegranate-50"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            disabled={!selected.length || saving}
            className="flex-1 rounded-full bg-pomegranate-600 py-6 text-base hover:bg-pomegranate-700"
          >
            {saving ? "Saving…" : "Continue"}
            {!saving && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}