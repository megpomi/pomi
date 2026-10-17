import React from "react";
import { splitByCause } from "@/lib/donations";

const money = (value) => `$${value.toFixed(2)}`;

export default function DonationCauses({ user, pot }) {
  const shares = splitByCause(user, pot);

  if (!shares.length) {
    return (
      <p className="mt-6 text-sm text-slate-400">
        You haven't chosen any causes yet — your pot is split equally between
        the causes you pick.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Your causes
        </h3>
        <span className="text-xs text-slate-400">all time · split equally</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {shares.map((share) => (
          <li
            key={share.value}
            className="flex items-center justify-between gap-4 py-2.5"
          >
            <span className="text-sm text-slate-600">{share.label}</span>
            <span className="font-heading text-sm font-semibold text-pomegranate-600">
              {money(share.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}