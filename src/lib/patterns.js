// Patterns are read one month at a time: the present month by default, with the
// stepper moving back through earlier ones. Everything here is derived from the
// logs the user already has, so nothing extra is stored.

export const MOOD_SCORE = { anxious: 1, low: 2, okay: 3, good: 4, great: 5 };
export const MOOD_WORD = {
  1: "Anxious",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export const startOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const monthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const shiftMonth = (date, delta) =>
  new Date(date.getFullYear(), date.getMonth() + delta, 1);

export const formatMonth = (date) =>
  date.toLocaleDateString(undefined, { month: "long", year: "numeric" });

const dayLabel = (key) =>
  new Date(`${key}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

// One point per day the user logged something in that month — a period day or a
// daily check-in — oldest to newest.
export function monthSeries(logs, dailyLogs, month) {
  const key = monthKey(month);
  const byDay = new Map();

  const add = (date, mood, symptoms) => {
    const day = String(date || "").slice(0, 10);
    if (!day.startsWith(key)) return;
    const current = byDay.get(day) || { mood: null, symptoms: 0 };
    byDay.set(day, {
      mood: MOOD_SCORE[mood] ?? current.mood,
      symptoms: Math.max(current.symptoms, symptoms),
    });
  };

  logs.forEach((log) =>
    add(log.start_date, log.mood, log.symptoms?.length || 0)
  );
  dailyLogs.forEach((entry) =>
    add(entry.date, entry.mood, entry.symptoms?.length || 0)
  );

  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, entry]) => ({ label: dayLabel(day), ...entry }));
}

// The headline numbers for the month: days logged, symptoms logged, and the
// mood the user reported most often.
export function summarise(series) {
  const moods = series.map((day) => day.mood).filter(Boolean);
  const counts = moods.reduce(
    (acc, mood) => ({ ...acc, [mood]: (acc[mood] || 0) + 1 }),
    {}
  );
  const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];

  return {
    days: series.length,
    symptoms: series.reduce((total, day) => total + day.symptoms, 0),
    mood: topMood ? MOOD_WORD[topMood] : null,
  };
}