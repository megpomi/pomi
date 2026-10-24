import React from "react";

// A woman with a baby bump — used for the pregnancy journey option.
export default function PregnancyIcon({ className }) {
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
      <circle cx="12" cy="4.2" r="2.1" />
      <path d="M12 6.3v1.6" />
      <path d="M9.4 8.4a6 6 0 0 1 5.2 0" />
      <path d="M9.4 8.4C7.7 9.9 6.9 12.1 7.5 14.1c.4 1.7 1.7 3 3.4 3.4" />
      <path d="M14.6 8.4c1.1 1.5 1.4 3.4.8 5.2-.6 1.8-1.9 3.1-3.5 3.6" />
      <path d="M10.9 17.5v2.4" />
      <path d="M11.9 17.2v2.7" />
    </svg>
  );
}