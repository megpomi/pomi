import React from "react";

export default function PomegranateSeed({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2.5c0 0 6.5 8.2 6.5 12.4A6.5 6.5 0 0 1 12 21.5a6.5 6.5 0 0 1-6.5-6.6C5.5 10.7 12 2.5 12 2.5Z"
        fill="#c92a4d"
      />
      <path
        d="M9.4 12.6c0-1.6 1.2-3.6 2.6-5.2.3 1.9.4 3.6.2 5.2-.2 1.3-.9 2.1-1.7 2.1-.7 0-1.1-.8-1.1-2.1Z"
        fill="#f2a3b2"
        opacity="0.7"
      />
    </svg>
  );
}