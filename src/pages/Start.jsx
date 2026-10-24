import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import Home from "@/pages/Home";
import OnboardingQuestionnaire from "@/components/OnboardingQuestionnaire";

// Entry point: new visitors answer the setup questions and create their account,
// people who already have an account land straight on their dashboard.
export default function Start() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.auth
      .me()
      .then((u) => {
        if (active) setUser(u || null);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pomegranate-100 border-t-pomegranate-600" />
      </div>
    );
  }

  if (user?.tracking_focus?.length) {
    return <Home />;
  }

  return (
    <OnboardingQuestionnaire
      onComplete={(focus) =>
        setUser((prev) => ({ ...prev, tracking_focus: focus }))
      }
    />
  );
}