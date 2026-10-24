import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Switch } from "@/components/ui/switch";

export default function MenstruatingToday({ initialValue = false }) {
  const [bleeding, setBleeding] = useState(Boolean(initialValue));

  const handleChange = async (value) => {
    setBleeding(value);
    await base44.auth.updateMe({ currently_menstruating: value });
  };

  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-pomegranate-100 bg-white px-5 py-4">
      <span className="text-sm font-medium text-slate-700">
        Are you menstruating today?
      </span>
      <Switch checked={bleeding} onCheckedChange={handleChange} />
    </div>
  );
}