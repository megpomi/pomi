import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

const todayKey = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// A log covers today when it starts today or its range includes today.
const findTodayLog = (logs, today) =>
  (logs || []).find(
    (l) =>
      l.start_date === today ||
      (l.end_date && l.start_date <= today && today <= l.end_date)
  );

export default function MenstruatingToday({ logs, onChanged }) {
  const today = todayKey();
  const todayLog = findTodayLog(logs, today);
  const [checked, setChecked] = useState(Boolean(todayLog));
  const [saving, setSaving] = useState(false);

  // The calendar is the source of truth — edits there move the switch.
  useEffect(() => {
    setChecked(Boolean(findTodayLog(logs, today)));
  }, [logs, today]);

  const handleChange = async (value) => {
    setChecked(value);
    setSaving(true);
    try {
      if (value) {
        if (!todayLog) {
          await base44.entities.CycleLog.create({
            start_date: today,
            flow_intensity: "medium",
          });
        }
      } else if (
        todayLog &&
        todayLog.start_date === today &&
        (!todayLog.end_date || todayLog.end_date === today)
      ) {
        // Only undo the entry this switch added — calendar entries are kept.
        await base44.entities.CycleLog.delete(todayLog.id);
      }
      await base44.auth.updateMe({ currently_menstruating: value });
      onChanged?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-4 max-w-xs rounded-2xl border border-pomegranate-100 bg-white/70 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-700">
          Are you menstruating today?
        </span>
        <div className="flex items-center gap-2">
          {saving && (
            <Loader2 className="h-4 w-4 animate-spin text-pomegranate-400" />
          )}
          <Switch
            checked={checked}
            onCheckedChange={handleChange}
            disabled={saving}
          />
        </div>
      </div>
    </div>
  );
}