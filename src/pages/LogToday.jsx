import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  FlowPicker,
  MoodPicker,
  SexToggle,
  SymptomPicker,
} from "@/components/daily-log/DailyLogFields";

const EMPTY = {
  flow_intensity: "none",
  mood: "",
  symptoms: [],
  had_sex: false,
  notes: "",
};

// Daily check-in. One entry per day: saving again updates it. Opened with a
// ?date= param it edits that day instead of today.
export default function LogToday() {
  const today = format(new Date(), "yyyy-MM-dd");
  const requestedDate = new URLSearchParams(window.location.search).get("date");
  const date = requestedDate || today;
  const isToday = date === today;
  const [form, setForm] = useState(EMPTY);
  const [entryId, setEntryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    base44.entities.DailyLog.filter({ date }, { limit: 1 })
      .then((page) => {
        if (!active) return;
        const entry = page.items[0];
        setEntryId(entry?.id || null);
        setForm({
          flow_intensity: entry?.flow_intensity || "none",
          mood: entry?.mood || "",
          symptoms: entry?.symptoms || [],
          had_sex: entry?.had_sex || false,
          notes: entry?.notes || "",
        });
      })
      .catch(() => active && setError("Couldn't load this day's entry."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [date]);

  const set = (patch) => setForm((current) => ({ ...current, ...patch }));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        date,
        flow_intensity: form.flow_intensity,
        symptoms: form.symptoms,
        had_sex: form.had_sex,
        notes: form.notes,
      };
      if (form.mood) payload.mood = form.mood;
      if (entryId) {
        await base44.entities.DailyLog.update(entryId, payload);
      } else {
        await base44.entities.DailyLog.create(payload);
      }
      toast({
        title: isToday ? "Today's entry saved" : "Entry saved",
        description: isToday
          ? "Thanks for checking in."
          : "Thanks for filling in that day.",
      });
      navigate("/");
    } catch (e) {
      setError(e?.message || "Couldn't save your entry. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader maxWidth="max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-pomegranate-600 hover:text-pomegranate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to my cycle
        </Link>
      </AppHeader>

      <main className="mx-auto max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
        <h1 className="font-heading text-3xl font-semibold text-slate-800 sm:text-4xl">
          {isToday ? "How are you today?" : "Edit this day"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {format(new Date(`${date}T00:00:00`), "EEEE d MMMM")} —{" "}
          {isToday
            ? "log your flow, mood and symptoms for today."
            : "update the flow, mood and symptoms you logged for this day."}
        </p>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-pomegranate-400" />
          </div>
        ) : (
          <div className="mt-6 space-y-6 rounded-3xl border border-slate-100 bg-white p-5 sm:p-6">
            <FlowPicker
              value={form.flow_intensity}
              onChange={(value) => set({ flow_intensity: value })}
            />
            <MoodPicker
              value={form.mood}
              onChange={(value) => set({ mood: value })}
            />
            <SymptomPicker
              value={form.symptoms}
              onChange={(value) => set({ symptoms: value })}
            />
            <SexToggle
              value={form.had_sex}
              onChange={(value) => set({ had_sex: value })}
            />

            <div className="space-y-2">
              <Label htmlFor="daily-notes">Notes</Label>
              <Textarea
                id="daily-notes"
                rows={3}
                value={form.notes}
                onChange={(e) => set({ notes: e.target.value })}
                placeholder="Anything else worth remembering?"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              onClick={save}
              disabled={saving}
              className="w-full rounded-full bg-pomegranate-600 py-6 text-base hover:bg-pomegranate-700"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save entry
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}