import React from "react";
import { Heart, Sparkles } from "lucide-react";
import {
  AD_DONATION_PER_VISIT,
  SUBSCRIPTION_DONATION_PER_DAY,
  donationTotals,
} from "@/lib/donations";

const money = (value) => `$${value.toFixed(2)}`;

export default function DonationTracker({ user }) {
  const totals = donationTotals(user);
  const subscribed = totals.mode === "subscription";

  const countLabel = (count) =>
    subscribed
      ? `${count} ${count === 1 ? "day" : "days"} subscribed`
      : `${count} ${count === 1 ? "ad view" : "ad views"}`;

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <div className="mb-1 flex items-center gap-2">
        <Heart className="h-4 w-4 fill-pomegranate-400 text-pomegranate-400" />
        <h2 className="font-heading text-lg font-semibold text-slate-800">
          Your donations
        </h2>
      </div>
      <p className="mb-5 text-sm text-slate-500">
        {subscribed
          ? "Your ad-free subscription builds donations every day — nothing to log."
          : "Every time you open Pomi, the ads you see add to your donations."}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-pomegranate-50 p-5">
          <p className="text-xs uppercase tracking-wider text-pomegranate-500">
            This month
          </p>
          <p className="mt-1 font-heading text-3xl font-semibold text-pomegranate-700">
            {money(totals.thisMonth)}
          </p>
          <p className="mt-1 text-xs text-pomegranate-600">
            {countLabel(totals.thisMonthCount)}
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-pomegranate-500 to-pomegranate-700 p-5 text-white">
          <p className="text-xs uppercase tracking-wider text-white/80">
            All time
          </p>
          <p className="mt-1 font-heading text-3xl font-semibold">
            {money(totals.allTime)}
          </p>
          <p className="mt-1 text-xs text-white/80">
            {countLabel(totals.allTimeCount)}
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
        <Sparkles className="h-3.5 w-3.5 text-pomegranate-400" />
        {subscribed
          ? `${money(SUBSCRIPTION_DONATION_PER_DAY)} added for every day you're subscribed`
          : `${money(AD_DONATION_PER_VISIT)} added for every visit — go ad-free to build donations daily`}
      </p>
    </div>
  );
}