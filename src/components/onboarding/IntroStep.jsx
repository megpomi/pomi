import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, RefreshCw, Sun, Heart } from "lucide-react";
import PomegranateLogo from "@/components/PomegranateLogo";

const SYMBOLISM = [
  {
    icon: Layers,
    title: "What lies beneath",
    text: "A pomegranate's intricate internal structures are hidden beneath the surface — a symbol of the struggles of women's health.",
  },
  {
    icon: RefreshCw,
    title: "Cycles of life",
    text: "Its many seeds and returning seasons echo the cycles of life and transformation.",
  },
  {
    icon: Sun,
    title: "Persephone's seeds",
    text: "In Greek mythology, Persephone ate pomegranate seeds, binding her to the underworld — and creating the cycle of seasons.",
  },
];

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
            Pomi is named after the pomegranate — and built on a simple idea: the
            more you understand your body, the more good you can do with it.
          </p>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-pomegranate-100 bg-white p-5">
          <Heart className="mt-0.5 h-5 w-5 shrink-0 fill-pomegranate-400 text-pomegranate-400" />
          <p className="text-sm leading-relaxed text-slate-600">
            Every cycle you log helps fund women's health. Your data powers your
            own personalized insights — and a share of what Pomi earns goes to
            the causes you choose.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {SYMBOLISM.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="flex items-start gap-4 rounded-2xl border border-pomegranate-100 bg-white p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pomegranate-50 text-pomegranate-500">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-slate-800">{s.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                    {s.text}
                  </p>
                </div>
              </div>
            );
          })}
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