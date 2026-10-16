import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import pomiLogo from "@/assets/pomi-logo.png";
import { useToast } from "@/components/ui/use-toast";
import AdFreeBenefits from "@/components/upgrade/AdFreeBenefits";
import DonationImpact from "@/components/upgrade/DonationImpact";
import PlanPicker from "@/components/upgrade/PlanPicker";

export default function Upgrade() {
  const [charityInterests, setCharityInterests] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    base44.auth
      .me()
      .then((u) => setCharityInterests(u?.charity_interests || []))
      .catch(() => setCharityInterests([]));
  }, []);

  const handleSubscribe = () => {
    toast({
      title: "Ad-free is almost here",
      description:
        "Checkout isn't switched on yet — you'll be able to subscribe right here very soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-pomegranate-100/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Image
            src={pomiLogo}
            alt="Pomi"
            className="h-14 w-14"
            fittingType="fit"
          />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-pomegranate-600 hover:text-pomegranate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to my cycle
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-pomegranate-400">
            Pomi ad-free
          </span>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-slate-800 sm:text-4xl">
            Track without ads, give more
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            Pomi is free because of ads — but every ad you see is money that
            doesn't reach the causes you chose. Go ad-free and your whole
            subscription works for women's health instead.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AdFreeBenefits />
            <div className="mt-6">
              <DonationImpact charityInterests={charityInterests} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <PlanPicker onSubscribe={handleSubscribe} />
          </div>
        </div>
      </main>
    </div>
  );
}