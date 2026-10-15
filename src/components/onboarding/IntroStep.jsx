import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Navigation } from "lucide-react";
import PomegranateLogo from "@/components/PomegranateLogo";
import PomegranateSeed from "@/components/onboarding/PomegranateSeed";

export default function IntroStep({ onStart }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf6f7] px-5 py-10">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center text-center">
          <PomegranateLogo className="h-14 w-14" />
          <h1 className="mt-4 font-heading text-3xl font-semibold text-slate-800">
            Welcome to Pomi
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
            as in the pomegranate - Symbolic of health, abundance and natural
            cycles
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-pomegranate-100 bg-white p-5">
            <Heart className="mt-0.5 h-5 w-5 shrink-0 fill-pomegranate-400 text-pomegranate-400" />
            <p className="text-sm leading-relaxed text-slate-600">
              Our purpose is built on the simple idea that every cycle is
              powerful
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-pomegranate-100 bg-white p-5">
            <PomegranateSeed className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm leading-relaxed text-slate-600">
              Your data powers your own personalised health insights
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-pomegranate-100 bg-white p-5">
            <Navigation className="mt-0.5 h-5 w-5 shrink-0 fill-pomegranate-400 text-pomegranate-400" />
            <p className="text-sm leading-relaxed text-slate-600">
              App revenue generates trackable donations sent in full
              transparency to the causes you choose
            </p>
          </div>
        </div>

        <Button
          onClick={onStart}
          className="mt-6 w-full rounded-full bg-pomegranate-600 py-6 text-base hover:bg-pomegranate-700"
        >
          Get started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}