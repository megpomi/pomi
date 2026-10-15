import React from "react";

export default function MoneyBag({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 6.6h6l1.1 3.9h-8.2L9 6.6Z"
        fill="#a91e3f"
      />
      <path
        d="M7.9 10.5C6.1 12.6 5 15.1 5 17.3 5 20.2 7.2 22 10 22h4c2.8 0 5-1.8 5-4.7 0-2.2-1.1-4.7-2.9-6.8H7.9Z"
        fill="#c92a4d"
      />
      <path
        d="M9 6.6c1 1.1 5 1.1 6 0"
        stroke="#f2a3b2"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="12"
        y="18.6"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="#fbe3e7"
      >
        $
      </text>
    </svg>
  );
}