import React from "react";
import { Heart, Sparkles, ArrowUpRight } from "lucide-react";

const CHARITIES = [
  {
    name: "Days for Girls",
    focus: "Menstrual equity & access",
  },
  {
    name: "Endometriosis Foundation",
    focus: "Research & awareness",
  },
  {
    name: "Maternal Health Initiatives",
    focus: "Safe maternal care",
  },
];

export default function CharityImpact({ daysTracked }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-pomegranate-100 bg-gradient-to-br from-pomegranate-500 to-pomegranate-800 p-8 text-white sm:p-10">
      <div className="mb-6 flex items-center gap-2">
        <Heart className="h-4 w-4 fill-white/80" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
          Our mission
        </span>
      </div>

      <h3 className="font-heading text-2xl font-semibold leading-snug sm:text-3xl">
        Every day you track helps fund women's health.
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
        Komi is free with ads, or ad-free with a subscription. A share of every
        dollar we earn is donated to nonprofits supporting menstrual equity,
        research, and maternal care.
      </p>

      <div className="mt-7 rounded-2xl bg-white/15 p-5 backdrop-blur-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/70">
              Your contribution
            </p>
            <p className="mt-1 font-heading text-4xl font-semibold">
              {daysTracked}
              <span className="ml-1 text-lg font-normal text-white/80">
                days tracked
              </span>
            </p>
          </div>
          <Sparkles className="h-8 w-8 text-white/70" />
        </div>
        <p className="mt-2 text-xs text-white/70">
          Consistent tracking powers the community that makes these donations
          possible.
        </p>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs uppercase tracking-wider text-white/70">
          Causes we support
        </p>
        <div className="space-y-2">
          {CHARITIES.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5"
            >
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-white/70">{c.focus}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/60" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-white/60">
          Featured partners — donation distributions are made by Komi
          periodically.
        </p>
      </div>
    </div>
  );
}