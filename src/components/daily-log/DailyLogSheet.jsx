import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FlowPicker,
  MoodPicker,
  SymptomPicker,
} from "@/components/daily-log/DailyLogFields";

const EMPTY = {
  flow_intensity: "none",
  mood: "",
  symptoms: [],
  notes: "",
};

// Daily check-in for today. One entry per day: saving again updates it.
export default function DailyLogSheet({ open, onOpenChange, onSaved }) {
  const date = format(new Date(), "yyyy-MM-dd");
  const [form, setForm] = useState(EMPTY);
  const [entryId, setEntryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    let active = true;
    setError("");
    setLoading(true);
    base44.entities.DailyLog.filter({ date }, { limit: 1 })
      .then((page) => {
        if (!active) return;
        const entry = page.items[0];
        setEntryId(entry?.id || null);
        setForm({
          flow_intensity: entry?.flow_intensity || "none",
          mood: entry?.mood || "",
          symptoms: entry?.symptoms || [],
          notes: entry?.notes || "",
        });
      })
      .catch(() => active && setError("Couldn't load today's entry."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [open, date]);

  const set = (patch) => setForm((current) => ({ ...current, ...patch }));

  const submit = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        date,
        flow_intensity: form.flow_intensity,
        symptoms: form.symptoms,
        notes: form.notes,
      };
      if (form.mood) payload.mood = form.mood;
      if (entryId) {
        await base44.entities.DailyLog.update(entryId, payload);
      } else {
        await base44.entities.DailyLog.create(payload);
      }
      onSaved?.();
    } catch (e) {
      setError(e?.message || "Couldn't save your entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            How are you today?
          </DialogTitle>
          <DialogDescription>
            {format(new Date(), "EEEE d MMMM")} — a quick check-in on your flow,
            mood and symptoms.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-pomegranate-400" />
          </div>
        ) : (
          <div className="space-y-6 py-2">
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

            {error && <p className="text-sm text-pomegranate-600">{error}</p>}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange?.(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={saving || loading}
            className="bg-pomegranate-600 hover:bg-pomegranate-700"
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}