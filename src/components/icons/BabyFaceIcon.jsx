import React from "react";

// A baby's face with a pacifier — used for the postpartum recovery option.
export default function BabyFaceIcon({ className }) {
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
      <circle cx="12" cy="10.4" r="6" />
      <path d="M9.3 4.8c.4-1.3 1.5-2.1 2.9-2.2" />
      <circle cx="9.8" cy="9.6" r="0.6" />
      <circle cx="14.2" cy="9.6" r="0.6" />
      <ellipse cx="12" cy="14.8" rx="2.5" ry="1.7" />
      <circle cx="12" cy="17.4" r="1.1" />
    </svg>
  );
}