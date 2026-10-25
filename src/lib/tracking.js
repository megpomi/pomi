import { Droplet, Egg, Flame, HeartPulse, Sprout } from "lucide-react";
import LotusIcon from "@/components/icons/LotusIcon";

// The areas a user can choose to track — shared by onboarding and the profile page.
export const TRACKING_OPTIONS = [
  {
    value: "menstrual_cycles",
    label: "Menstrual cycles",
    desc: "Track periods, flow, and predictions.",
    icon: Droplet,
  },
  {
    value: "perimenopause_menopause",
    label: "Perimenopausal or menopausal",
    desc: "Track hot flashes, sleep, and mood shifts.",
    icon: Flame,
    comingSoon: true,
  },
  {
    value: "trying_to_conceive",
    label: "Trying for a baby",
    desc: "Watch for ovulation and your fertile window with the intention of conception.",
    icon: Egg,
    comingSoon: true,
  },
  {
    value: "pregnancy",
    label: "Pregnancy journey",
    desc: "Track pregnancy symptoms.",
    icon: Sprout,
    comingSoon: true,
  },
  {
    value: "postpartum",
    label: "Postpartum recovery",
    desc: "Track recovery and changes after birth.",
    icon: HeartPulse,
    comingSoon: true,
  },
  {
    value: "general_wellbeing",
    label: "General wellbeing",
    desc: "Track mood, energy, and everyday health.",
    icon: LotusIcon,
  },
];