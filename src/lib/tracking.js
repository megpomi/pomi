import { Baby, Droplet, Flame } from "lucide-react";
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
    value: "pregnancy_postpartum",
    label: "Pregnant, postpartum or trying for a baby",
    desc: "Follow your journey and how you feel.",
    icon: Baby,
  },
  {
    value: "general_wellbeing",
    label: "General well-being",
    desc: "Track mood, energy, and everyday health.",
    icon: LotusIcon,
  },
];