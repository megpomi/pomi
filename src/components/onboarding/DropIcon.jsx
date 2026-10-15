import React from "react";

export default function DropIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2.2C12 2.2 5.1 9.9 5.1 14.5a6.9 6.9 0 0 1 13.8 0C18.9 9.9 12 2.2 12 2.2Z"
        fill="currentColor"
      />
      <ellipse
        cx="9.3"
        cy="13.4"
        rx="1.4"
        ry="2.6"
        transform="rotate(24 9.3 13.4)"
        fill="hsl(var(--background))"
        opacity="0.5"
      />
    </svg>
  );
}