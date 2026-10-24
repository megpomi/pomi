import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { isSubscriber } from "@/lib/donations";

// Whether the signed-in user is on an ad-free plan.
export default function useIsSubscriber() {
  const [subscriber, setSubscriber] = useState(false);

  useEffect(() => {
    base44.auth
      .me()
      .then((u) => setSubscriber(isSubscriber(u)))
      .catch(() => setSubscriber(false));
  }, []);

  return subscriber;
}