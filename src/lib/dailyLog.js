// Options for the daily check-in — mood, flow and symptoms.

export const FLOW_OPTIONS = [
  { value: "none", label: "None", dot: "bg-slate-300" },
  { value: "light", label: "Light", dot: "bg-pomegranate-200" },
  { value: "medium", label: "Medium", dot: "bg-pomegranate-400" },
  { value: "heavy", label: "Heavy", dot: "bg-pomegranate-600" },
];

export const MOOD_OPTIONS = [
  { value: "great", emoji: "😊", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "low", emoji: "😔", label: "Low" },
  { value: "anxious", emoji: "😰", label: "Anxious" },
];

export const SYMPTOM_OPTIONS = [
  "cramps",
  "headache",
  "bloating",
  "fatigue",
  "breast_tenderness",
  "spotting",
  "acne",
  "cravings",
  "appetite_loss",
  "backache",
  "mood_swings",
  "insomnia",
  "dreams",
  "increased_libido",
];

export const DISCHARGE_OPTIONS = [
  "egg_white",
  "creamy",
  "watery",
  "sticky",
  "milky_white",
  "yellow",
  "green",
  "brown",
];

export const prettySymptom = (symptom) => symptom.replace(/_/g, " ");