// Cycle prediction helpers — pure functions shared across components.

export function computeCycleStats(logs) {
  const sorted = [...logs].sort(
    (a, b) => new Date(a.start_date) - new Date(b.start_date)
  );

  const cycleLengths = [];
  for (let i = 1; i < sorted.length; i++) {
    const diff =
      (new Date(sorted[i].start_date) - new Date(sorted[i - 1].start_date)) /
      86400000;
    if (diff > 10 && diff < 60) cycleLengths.push(diff);
  }
  const avgCycle = cycleLengths.length
    ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
    : 28;

  const periodLengths = sorted
    .filter((l) => l.end_date)
    .map(
      (l) => (new Date(l.end_date) - new Date(l.start_date)) / 86400000 + 1
    );
  const avgPeriod = periodLengths.length
    ? Math.round(periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length)
    : 5;

  return { sorted, avgCycle, avgPeriod };
}

export function getCurrentPhase(logs) {
  const { sorted, avgCycle, avgPeriod } = computeCycleStats(logs);
  if (!sorted.length)
    return { phase: "unknown", avgCycle, avgPeriod, dayOfCycle: null };

  const last = sorted[sorted.length - 1];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastStart = new Date(last.start_date);
  lastStart.setHours(0, 0, 0, 0);

  const dayOfCycle = Math.floor((today - lastStart) / 86400000) + 1;
  if (dayOfCycle < 0)
    return { phase: "unknown", avgCycle, avgPeriod, dayOfCycle: null };

  const onPeriod = dayOfCycle <= avgPeriod;
  const nextStart = new Date(lastStart);
  nextStart.setDate(nextStart.getDate() + avgCycle);
  const daysUntilNext = Math.round((nextStart - today) / 86400000);

  let phase = "follicular";
  if (onPeriod) phase = "period";
  else if (daysUntilNext <= 14 && daysUntilNext >= 9) phase = "luteal";
  else if (daysUntilNext <= 16) phase = "ovulation";

  return {
    phase,
    onPeriod,
    dayOfCycle,
    daysUntilNext,
    nextStart,
    lastStart,
    avgCycle,
    avgPeriod,
  };
}

export function phaseLabel(phase) {
  return {
    period: "Menstrual",
    follicular: "Follicular",
    ovulation: "Ovulation",
    luteal: "Luteal",
    unknown: "—",
  }[phase] || "—";
}