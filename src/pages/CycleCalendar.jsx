import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CalendarPanel from "@/components/calendar/CalendarPanel";
import PeriodHistoryCalendar from "@/components/calendar/PeriodHistoryCalendar";

export default function CycleCalendar() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const logMode = searchParams.get("log") === "1";
  const { toast } = useToast();

  const loadLogs = useCallback(
    () =>
      base44.entities.CycleLog.filter({}, { sort: "-start_date", limit: 200 })
        .then((res) => setLogs(res.items))
        .finally(() => setLoading(false)),
    []
  );

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader maxWidth="max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-pomegranate-600 hover:text-pomegranate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to my cycle
        </Link>
      </AppHeader>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        {logMode ? (
          <>
            <h1 className="font-heading text-3xl font-semibold text-slate-800 sm:text-4xl">
              Log historical menstrual days
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Tap days you were menstruating to build up your history.
            </p>

            <div className="mt-6">
              {loading ? (
                <div className="h-64 animate-pulse rounded-3xl bg-white" />
              ) : (
                <PeriodHistoryCalendar
                  logs={logs}
                  onSaved={() => {
                    loadLogs();
                    toast({
                      title: "Days added",
                      description: "Your calendar is updated.",
                    });
                    setSearchParams({});
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl font-semibold text-slate-800 sm:text-4xl">
                  Your calendar
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Every day you've logged, in one place. Tap a day to see what
                  you recorded.
                </p>
              </div>
              <Button
                onClick={() => setSearchParams({ log: "1" })}
                className="rounded-full bg-pomegranate-600 hover:bg-pomegranate-700"
              >
                <CalendarPlus className="mr-1.5 h-4 w-4" />
                Log historical data
              </Button>
            </div>

            <div className="mt-6">
              <CalendarPanel logs={logs} loading={loading} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}