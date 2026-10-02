import React from "react";

export default function PomegranateLogo({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 45C14.6 45 8 38.6 8 29.4 8 18.6 15.2 11 24 11s16 7.6 16 18.4C40 38.6 33.4 45 24 45Z"
        fill="#c92a4d"
      />
      <path
        d="M19.5 9.4 22 3l2 4 2-4 2.5 6.4c-1.5.8-3 1.2-4.5 1.2s-3-.4-4.5-1.2Z"
        fill="#a91e3f"
      />
      <g fill="#fbe3e7">
        <circle cx="18" cy="27" r="2.2" />
        <circle cx="24" cy="23" r="2.2" />
        <circle cx="30" cy="27" r="2.2" />
        <circle cx="21" cy="34" r="2.2" />
        <circle cx="27" cy="34" r="2.2" />
        <circle cx="24" cy="30" r="2.2" />
      </g>
    </svg>
  );
}