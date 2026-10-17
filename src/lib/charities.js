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
    summary: "Menstrual products and dignity for people who can't afford them.",
    about:
      "Period poverty is the lack of access to menstrual products, sanitation and education. It keeps girls out of school and adults out of work, and it exists in every country, not only in low-income ones.",
    impact: [
      "Pads, cups and tampons distributed through local partners",
      "Menstrual health education in schools and community centres",
      "Advocacy that keeps period products affordable and available in public buildings",
    ],
  },
  {
    value: "endometriosis",
    label: "Endometriosis research",
    icon: HeartPulse,
    summary: "Funding research into a condition that takes years to diagnose.",
    about:
      "Endometriosis affects roughly one in ten people who menstruate, yet diagnosis still takes an average of seven to eight years. Research into its causes, better diagnostic tools and effective treatments remains chronically underfunded.",
    impact: [
      "Research grants for non-invasive diagnosis",
      "Studies into pain management and treatment options",
      "Awareness campaigns that shorten the path to diagnosis",
    ],
  },
  {
    value: "pmos",
    label: "PMOS (Polyendocrine Metabolic Ovarian Syndrome) research",
    icon: Activity,
    summary: "Research and support for a common hormonal and metabolic condition.",
    about:
      "PMOS is a hormonal and metabolic condition affecting a large share of people who menstruate. It sits at the crossroads of reproductive and long-term metabolic health, and is often misunderstood by patients and clinicians alike.",
    impact: [
      "Research into hormonal and metabolic drivers",
      "Better clinical guidance for diagnosis and ongoing care",
      "Patient education and peer support",
    ],
  },
  {
    value: "fertility",
    label: "Fertility research and treatment grants",
    icon: Sprout,
    summary: "Treatment grants and research for people trying to conceive.",
    about:
      "Fertility care is expensive and unevenly accessible, and much of it is not covered by insurance or public health systems. Research into the causes of infertility and more affordable treatment lags behind demand.",
    impact: [
      "Treatment grants for people who can't afford care",
      "Research into the causes of infertility",
      "Support for people navigating treatment and loss",
    ],
  },
  {
    value: "cancer",
    label: "Ovarian and cervical cancer research and support",
    icon: Ribbon,
    summary: "Earlier detection and support for gynaecological cancers.",
    about:
      "Ovarian cancer is often found late, when treatment options are narrower. Cervical cancer is largely preventable through screening and vaccination. Both depend on awareness, screening access and research.",
    impact: [
      "Screening and vaccination access programmes",
      "Research into earlier detection",
      "Practical support for people in treatment and recovery",
    ],
  },
  {
    value: "trans_aid",
    label: "Trans lives matter aid",
    icon: HeartHandshake,
    summary: "Healthcare, safety and dignity for trans people.",
    about:
      "Trans people face barriers to healthcare, housing and employment, and the organisations supporting them are often small and underfunded. Direct, practical aid makes an immediate difference.",
    impact: [
      "Access to gender-affirming care and mental health support",
      "Emergency funds for housing, food and safety",
      "Community organisations providing direct help",
    ],
  },
  {
    value: "violence_survivors",
    label: "Sexual and domestic violence survivors aid",
    icon: Gavel,
    summary: "Shelter, legal help and counselling for survivors.",
    about:
      "Survivors of sexual and domestic violence often need shelter, legal support and counselling at the same time, while services are frequently oversubscribed. Funding keeps refuges open and helplines staffed.",
    impact: [
      "Refuge beds and emergency accommodation",
      "Free legal advice and court support",
      "Trauma-informed counselling and helplines",
    ],
  },
];

export const charityByValue = (value) =>
  CHARITY_OPTIONS.find((c) => c.value === value);

export const charityLabel = (value) =>
  charityByValue(value)?.label || value;