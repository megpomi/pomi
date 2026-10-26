import React from "react";

// Pomi's own hand-drawn mood faces — thin line, pomegranate ink.
const FACE =
  "M12.2 3.4c4.7 0 8.4 3.7 8.4 8.5 0 4.9-3.7 8.5-8.6 8.5-4.8 0-8.5-3.7-8.5-8.5 0-4.7 3.8-8.5 8.7-8.5Z";

const EYES = (
  <>
    <circle cx="9.3" cy="10.3" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="14.7" cy="10.3" r="0.75" fill="currentColor" stroke="none" />
  </>
);

const MOUTHS = {
  great: "M8.7 13.5c.9 1.6 2.1 2.4 3.3 2.4s2.4-.8 3.3-2.4",
  good: "M9.3 13.9c.8 1 1.7 1.5 2.7 1.5s1.9-.5 2.7-1.5",
  okay: "M9.3 14.4c1.8.25 3.6.25 5.4 0",
  low: "M9.3 15.5c.8-.95 1.7-1.4 2.7-1.4s1.9.45 2.7 1.4",
  anxious: "M9.2 14.6c.65-.65 1.3-.65 1.95 0s1.3.65 1.95 0 1.3-.65 1.95 0",
};

export default function MoodFace({ mood, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={FACE} />
      {mood === "great" ? (
        <>
          <path d="M8.3 10.2c.55-1 1.35-1 1.9 0" />
          <path d="M13.8 10.2c.55-1 1.35-1 1.9 0" />
        </>
      ) : (
        EYES
      )}
      {mood === "anxious" && (
        <>
          <path d="M8.6 7.9c.6-.35 1.2-.3 1.8.1" />
          <path d="M15.4 7.9c-.6-.35-1.2-.3-1.8.1" />
        </>
      )}
      <path d={MOUTHS[mood] || MOUTHS.okay} />
    </svg>
  );
}