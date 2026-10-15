import React from "react";

export default function PomegranateSeed({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse
        cx="12"
        cy="12"
        rx="6.2"
        ry="9.2"
        transform="rotate(20 12 12)"
        fill="hsl(var(--primary))"
      />
      <ellipse
        cx="10.1"
        cy="9.6"
        rx="1.5"
        ry="2.7"
        transform="rotate(20 10.1 9.6)"
        fill="hsl(var(--background))"
        opacity="0.5"
      />
    </svg>
  );
}