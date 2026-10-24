import React from "react";

// A mother cradling her baby — used for the postpartum recovery option.
export default function MotherBabyIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="4.8" r="2.2" />
      <path d="M4.9 15.2v-3.9a4.1 4.1 0 0 1 4.1-4.1" />
      <path d="M13.1 11.3a4.1 4.1 0 0 0-4.1-4.1" />
      <circle cx="16.2" cy="9.8" r="1.7" />
      <path d="M16.2 11.5c-1.4 0-2.4.9-2.4 2.1v1.2" />
      <path d="M13.1 11.3c0 2.5 1.8 4.2 4.4 4.2h.9" />
    </svg>
  );
}