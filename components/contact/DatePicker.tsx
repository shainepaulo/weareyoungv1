"use client";

import { useEffect, useRef, useState } from "react";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Local ISO — `toISOString()` would shift the day for anyone east of UTC. */
function toISO(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function DatePicker({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const [view, setView] = useState<Date | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Read the clock on open, not on render: a server-rendered "today" can land
  // on a different day than the visitor's and break hydration.
  const today = startOfDay(new Date());
  const month = view ?? new Date(today.getFullYear(), today.getMonth(), 1);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const leading = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();
  const atCurrentMonth = year === today.getFullYear() && monthIndex === today.getMonth();

  function shiftMonth(step: number) {
    setView(new Date(year, monthIndex + step, 1));
  }

  return (
    <div className="datepicker" ref={root}>
      <input type="hidden" name={name} value={selected ? toISO(selected) : ""} />

      <button
        type="button"
        id={id}
        className="field__control datepicker__toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setView(
            selected
              ? new Date(selected.getFullYear(), selected.getMonth(), 1)
              : new Date(today.getFullYear(), today.getMonth(), 1),
          );
          setOpen((v) => !v);
        }}
      >
        {selected ? (
          `${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}`
        ) : (
          <span className="muted">Select a date</span>
        )}
      </button>

      {open && (
        <div className="datepicker__panel" role="dialog" aria-label="Choose a date">
          <div className="datepicker__head">
            <button
              type="button"
              className="datepicker__nav"
              onClick={() => shiftMonth(-1)}
              disabled={atCurrentMonth}
              aria-label="Previous month"
            >
              ←
            </button>
            <span className="mono-xs">
              {MONTHS[monthIndex]} {year}
            </span>
            <button
              type="button"
              className="datepicker__nav"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
            >
              →
            </button>
          </div>

          <div className="datepicker__grid">
            {WEEKDAYS.map((day, i) => (
              <span key={i} className="datepicker__dow mono-xs muted">
                {day}
              </span>
            ))}

            {Array.from({ length: leading }, (_, i) => (
              <span key={`pad-${i}`} />
            ))}

            {Array.from({ length: dayCount }, (_, i) => {
              const date = new Date(year, monthIndex, i + 1);
              const past = date < today;
              const on = selected !== null && toISO(selected) === toISO(date);

              return (
                <button
                  key={i}
                  type="button"
                  className={`datepicker__day${on ? " datepicker__day--on" : ""}`}
                  disabled={past}
                  aria-pressed={on}
                  onClick={() => {
                    setSelected(date);
                    setOpen(false);
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
