import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import pomiLogo from "@/assets/pomi-logo.png";
import CycleStatus from "@/components/CycleStatus";
import LogPeriodSheet from "@/components/LogPeriodSheet";
import CycleHistory from "@/components/CycleHistory";
import CharityImpact from "@/components/CharityImpact";
import CyclePatterns from "@/components/patterns/CyclePatterns";
import DonationTracker from "@/components/DonationTracker";
import { countTrackedDays, recordAdVisit } from "@/lib/donations";
import OnboardingQuestionnaire from "@/components/OnboardingQuestionnaire";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await base44.entities.CycleLog.filter(
        {},
        { sort: "-start_date", limit: 100 }
      );
      setLogs(res.items);
    } catch (e) {
      toast({
        title: "Couldn't load your cycles",
        description: e?.message || "Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  useEffect(() => {
    base44.auth
      .me()
      .then((u) => (u ? recordAdVisit(u) : u))
      .then((u) => setUser(u || null))
      .catch(() => setUser(null))
      .finally(() => setCheckingProfile(false));
  }, []);

  const handleSaved = () => {
    setSheetOpen(false);
    loadLogs();
    toast({ title: "Period logged", description: "Your cycle is updated." });
  };

  const daysTracked = countTrackedDays(logs);
  const trackingFocus = user?.tracking_focus || [];

  if (checkingProfile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pomegranate-100 border-t-pomegranate-600" />
      </div>
    );
  }

  if (!trackingFocus.length) {
    return (
      <OnboardingQuestionnaire
        onComplete={(focus) =>
          setUser((prev) => ({ ...prev, tracking_focus: focus }))
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-pomegranate-100/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Image
            src={pomiLogo}
            alt="Pomi"
            className="h-14 w-14"
            fittingType="fit"
          />
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-pomegranate-200 px-4 text-pomegranate-600 hover:bg-pomegranate-50"
            >
              <Link to="/upgrade">
                <Sparkles className="mr-1.5 h-4 w-4" />
                Go ad-free
              </Link>
            </Button>
            <Button
              onClick={() => setSheetOpen(true)}
              className="rounded-full bg-pomegranate-600 px-4 hover:bg-pomegranate-700"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Log period
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold text-slate-800 sm:text-4xl">
            Hello{logs.length ? "" : ", welcome"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {logs.length
              ? "Here's where you are in your cycle today."
              : "Let's start tracking your cycle — and giving back."}
          </p>
        </div>

        {/* Status */}
        <CycleStatus logs={logs} />

        {/* Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CycleHistory logs={logs} loading={loading} />
          </div>
          <div className="lg:col-span-2">
            <CharityImpact daysTracked={daysTracked} />
          </div>
        </div>

        {/* Donations */}
        <div className="mt-6">
          <DonationTracker user={user} />
        </div>

        {/* Patterns */}
        <div className="mt-6">
          <CyclePatterns logs={logs} />
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Pomi is not a medical device. For health concerns, please consult a
          healthcare professional.
        </p>
      </main>

      <LogPeriodSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSaved={handleSaved}
      />
    </div>
  );
}