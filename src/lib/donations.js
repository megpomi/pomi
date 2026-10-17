// Donations are funded from what Pomi earns, credited per day tracked.
export const DONATION_PER_DAY = 0.1;

const DAY = 86400000;

const toDate = (value) => {
  const d = new Date(value);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

// Days covered by one log — an open entry counts as a single day.
export const logDays = (log) => {
  const start = toDate(log.start_date);
  if (!log.end_date) return 1;
  const end = toDate(log.end_date);
  return Math.max(Math.round((end - start) / DAY) + 1, 1);
};

export const countTrackedDays = (logs) =>
  logs.reduce((total, log) => total + logDays(log), 0);

// Tracked days falling inside a calendar month (the current one by default).
export const daysInMonth = (logs, month = new Date()) => {
  const from = new Date(month.getFullYear(), month.getMonth(), 1);
  const to = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  return logs.reduce((total, log) => {
    const start = toDate(log.start_date);
    const end = log.end_date ? toDate(log.end_date) : start;
    const overlapStart = start > from ? start : from;
    const overlapEnd = end < to ? end : to;
    if (overlapStart > overlapEnd) return total;
    return total + Math.round((overlapEnd - overlapStart) / DAY) + 1;
  }, 0);
};

export const donationTotals = (logs) => {
  const thisMonthDays = daysInMonth(logs);
  const allTimeDays = countTrackedDays(logs);
  return {
    thisMonthDays,
    allTimeDays,
    thisMonth: thisMonthDays * DONATION_PER_DAY,
    allTime: allTimeDays * DONATION_PER_DAY,
  };
};