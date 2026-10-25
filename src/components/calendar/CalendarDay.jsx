import React from "react";

// A pomegranate dot marks every day that has data stored, so it reads as tappable.
export default function CalendarDay({ date, activeModifiers }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <span>{date.getDate()}</span>
      {activeModifiers.logged && (
        <span
          className={`absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
            activeModifiers.selected
              ? "bg-primary-foreground"
              : "bg-pomegranate-600"
          }`}
        />
      )}
    </div>
  );
}