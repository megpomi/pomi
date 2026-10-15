import React from "react";

export default function PomegranateLogo({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="hsl(var(--primary))">
        <path d="M17.6 12.6 18.8 6.4 22 10 24 4.6 26 10 29.2 6.4 30.4 12.6Z" />
        <circle cx="24" cy="27" r="16.6" />
      </g>

      <g
        stroke="hsl(var(--background))"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="24" y1="27" x2="9.62" y2="18.7" />
        <line x1="24" y1="27" x2="24" y2="43.6" />
        <line x1="24" y1="27" x2="38.38" y2="18.7" />
      </g>

      <g fill="hsl(var(--background))">
        <ellipse cx="20.6" cy="22" rx="2.1" ry="3.1" />
        <ellipse cx="27.4" cy="22" rx="2.1" ry="3.1" />
        <ellipse cx="20.6" cy="16" rx="2.1" ry="3.1" />
        <ellipse cx="27.4" cy="16" rx="2.1" ry="3.1" />

        <ellipse
          cx="21.37"
          cy="32.44"
          rx="2.1"
          ry="3.1"
          transform="rotate(60 21.37 32.44)"
        />
        <ellipse
          cx="17.97"
          cy="26.56"
          rx="2.1"
          ry="3.1"
          transform="rotate(60 17.97 26.56)"
        />
        <ellipse
          cx="16.17"
          cy="35.44"
          rx="2.1"
          ry="3.1"
          transform="rotate(60 16.17 35.44)"
        />
        <ellipse
          cx="12.77"
          cy="29.56"
          rx="2.1"
          ry="3.1"
          transform="rotate(60 12.77 29.56)"
        />

        <ellipse
          cx="26.63"
          cy="32.44"
          rx="2.1"
          ry="3.1"
          transform="rotate(-60 26.63 32.44)"
        />
        <ellipse
          cx="30.03"
          cy="26.56"
          rx="2.1"
          ry="3.1"
          transform="rotate(-60 30.03 26.56)"
        />
        <ellipse
          cx="31.83"
          cy="35.44"
          rx="2.1"
          ry="3.1"
          transform="rotate(-60 31.83 35.44)"
        />
        <ellipse
          cx="35.23"
          cy="29.56"
          rx="2.1"
          ry="3.1"
          transform="rotate(-60 35.23 29.56)"
        />
      </g>
    </svg>
  );
}