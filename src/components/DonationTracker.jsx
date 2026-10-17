import React from "react";
import { Heart } from "lucide-react";
import { donationTotals } from "@/lib/donations";

const money = (value) => `$${value.toFixed(2)}`;

export default function DonationTracker({ logs }) {
  const totals = donationTotals(logs);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <div className="mb-1 flex items-center gap-2">
        <Heart className="h-4 w-4 fill-pomegranate-400 text-pomegranate-400" />
        <h2 className="font-heading text-lg font-semibold text-slate-800">
          Your donations
        </h2>
      </div>
      <p className="mb-5 text-sm text-slate-500">
        A share of what Pomi earns is donated for every day you track.
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
            {totals.thisMonthDays} days tracked
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
            {totals.allTimeDays} days tracked
          </p>
        </div>
      </div>
    </div>
  );
}