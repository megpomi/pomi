import React from "react";
import { Bell, Mail, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";

// The two ways Pomi can reach the user, kept on their own record so the
// reminder that reads them can be switched off from here.
const ROWS = [
  {
    key: "email",
    label: "Email notifications",
    desc: "Your daily check-in reminder and occasional cycle updates.",
    icon: Mail,
  },
  {
    key: "push",
    label: "Push notifications",
    desc: "Alerts on your phone, in the Pomi mobile app.",
    icon: Smartphone,
  },
];

export default function NotificationPreferences({ preferences, onChange }) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-pomegranate-400" />
        <h2 className="font-heading text-lg font-semibold text-slate-800">
          Notifications
        </h2>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Choose how Pomi reminds you to log your cycle and symptoms.
      </p>

      <div className="mt-4 space-y-3">
        {ROWS.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.key}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pomegranate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{row.desc}</p>
                </div>
              </div>
              <Switch
                checked={Boolean(preferences[row.key])}
                onCheckedChange={(checked) =>
                  onChange({ ...preferences, [row.key]: checked })
                }
                aria-label={row.label}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}