import React from "react";

export default function YogaIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="5.4" r="2.2" />
      <path d="M12 7.6v7.6" />
      <path d="M12 9.9C9.5 10.3 7.6 12 6.5 15.3" />
      <path d="M12 9.9c2.5.4 4.4 2.1 5.5 5.4" />
      <path d="M4.7 15.6 12 19.6 19.3 15.6" />
    </svg>
  );
}