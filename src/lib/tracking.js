import { Baby, Droplet, Egg, Flame, HeartHandshake } from "lucide-react";
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
  },
  {
    value: "trying_to_conceive",
    label: "I'm trying for a baby",
    desc: "Watch for ovulation and fertile days.",
    icon: Egg,
  },
  {
    value: "pregnancy",
    label: "Pregnancy",
    desc: "Follow your pregnancy and how you feel.",
    icon: Baby,
  },
  {
    value: "postpartum",
    label: "Postpartum",
    desc: "Track recovery and changes after birth.",
    icon: HeartHandshake,
  },
  {
    value: "general_wellbeing",
    label: "General wellbeing",
    desc: "Track mood, energy, and everyday health.",
    icon: LotusIcon,
  },
];