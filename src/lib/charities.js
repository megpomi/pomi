import {
  Activity,
  Gavel,
  Globe,
  HeartHandshake,
  HeartPulse,
  Ribbon,
  Sprout,
} from "lucide-react";

export const CHARITY_OPTIONS = [
  {
    value: "period_poverty",
    label: "International period poverty aid",
    icon: Globe,
  },
  {
    value: "endometriosis",
    label: "Endometriosis research",
    icon: HeartPulse,
  },
  {
    value: "pmos",
    label: "PMOS (Polyendocrine Metabolic Ovarian Syndrome) research",
    icon: Activity,
  },
  {
    value: "fertility",
    label: "Fertility research and treatment grants",
    icon: Sprout,
  },
  {
    value: "cancer",
    label: "Ovarian and cervical cancer research and support",
    icon: Ribbon,
  },
  {
    value: "trans_aid",
    label: "Trans lives matter aid",
    icon: HeartHandshake,
  },
  {
    value: "violence_survivors",
    label: "Sexual and domestic violence survivors aid",
    icon: Gavel,
  },
];

export const charityLabel = (value) =>
  CHARITY_OPTIONS.find((c) => c.value === value)?.label || value;