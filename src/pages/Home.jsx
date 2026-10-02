import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Droplet } from "lucide-react";
import CycleStatus from "@/components/CycleStatus";
import LogPeriodSheet from "@/components/LogPeriodSheet";
import CycleHistory from "@/components/CycleHistory";
import CharityImpact from "@/components/CharityImpact";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
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

  const handleSaved = () => {
    setSheetOpen(false);
    loadLogs();
    toast({ title: "Period logged", description: "Your cycle is updated." });
  };

  // Days tracked = sum of period durations (with end date) + 1 per open entry
  const daysTracked = logs.reduce((acc, l) => {
    if (l.end_date) {
      const d =
        Math.round(
          (new Date(l.end_date) - new Date(l.start_date)) / 86400000
        ) + 1;
      return acc + Math.max(d, 1);
    }
    return acc + 1;
  }, 0);

  return (
    <div className="min-h-screen bg-[#fdf7f5]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-rose-100/70 bg-[#fdf7f5]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-500 text-white">
              <Droplet className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-semibold tracking-tight text-slate-800">
              Luna
            </span>
          </div>
          <Button
            onClick={() => setSheetOpen(true)}
            className="rounded-full bg-rose-500 px-4 hover:bg-rose-600"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Log period
          </Button>
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

        <p className="mt-10 text-center text-xs text-slate-400">
          Luna is not a medical device. For health concerns, please consult a
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