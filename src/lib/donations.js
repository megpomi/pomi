import { base44 } from "@/api/base44Client";

// Free (ad-supported) plan: the ads shown on each visit fund the donation.
export const AD_DONATION_PER_VISIT = 0.02;
// Ad-free subscription: donations build every day, whether or not the app is opened.
export const SUBSCRIPTION_DONATION_PER_DAY = 0.1;

const DAY = 86400000;
const VISIT_KEY = "pomi_ad_visit_recorded";

const toDate = (value) => {
  const d = new Date(value);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const monthKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const isSubscriber = (user) => !!user?.plan && user.plan !== "free";

// --- days tracked (shown as the tracking stat) ---

// Days covered by one log — an open entry counts as a single day.
export const logDays = (log) => {
  const start = toDate(log.start_date);
  if (!log.end_date) return 1;
  const end = toDate(log.end_date);
  return Math.max(Math.round((end - start) / DAY) + 1, 1);
};

export const countTrackedDays = (logs) =>
  logs.reduce((total, log) => total + logDays(log), 0);

// --- ad-funded donations (free plan) ---

const viewsByMonth = (user) => user?.ad_views_by_month || {};

export const adViewsThisMonth = (user) => viewsByMonth(user)[monthKey()] || 0;

export const adViewsAllTime = (user) =>
  Object.values(viewsByMonth(user)).reduce(
    (total, views) => total + (Number(views) || 0),
    0
  );

// One ad view per app visit, recorded once per browser session for ad-supported users.
export const recordAdVisit = async (user) => {
  if (!user || isSubscriber(user) || sessionStorage.getItem(VISIT_KEY)) {
    return user;
  }
  sessionStorage.setItem(VISIT_KEY, "1");

  const key = monthKey();
  const ad_views_by_month = {
    ...viewsByMonth(user),
    [key]: (viewsByMonth(user)[key] || 0) + 1,
  };

  try {
    await base44.auth.updateMe({ ad_views_by_month });
    return { ...user, ad_views_by_month };
  } catch (e) {
    console.error("Couldn't record this visit's ad view", e);
    return user;
  }
};

// --- subscription donations (ad-free plans) ---

// Whole days of subscription, optionally only those inside the current month.
const subscriptionDays = (user, { thisMonth = false } = {}) => {
  if (!isSubscriber(user) || !user.plan_started_at) return 0;

  const start = toDate(user.plan_started_at);
  const today = toDate(new Date());
  const end = user.plan_ended_at ? toDate(user.plan_ended_at) : today;
  const from = thisMonth
    ? new Date(today.getFullYear(), today.getMonth(), 1)
    : start;
  const overlapStart = start > from ? start : from;

  if (overlapStart > end) return 0;
  return Math.round((end - overlapStart) / DAY) + 1;
};

export const donationTotals = (user) => {
  if (isSubscriber(user)) {
    const thisMonthDays = subscriptionDays(user, { thisMonth: true });
    const allTimeDays = subscriptionDays(user);
    return {
      mode: "subscription",
      thisMonth: thisMonthDays * SUBSCRIPTION_DONATION_PER_DAY,
      allTime: allTimeDays * SUBSCRIPTION_DONATION_PER_DAY,
      thisMonthCount: thisMonthDays,
      allTimeCount: allTimeDays,
    };
  }

  const thisMonthViews = adViewsThisMonth(user);
  const allTimeViews = adViewsAllTime(user);
  return {
    mode: "ads",
    thisMonth: thisMonthViews * AD_DONATION_PER_VISIT,
    allTime: allTimeViews * AD_DONATION_PER_VISIT,
    thisMonthCount: thisMonthViews,
    allTimeCount: allTimeViews,
  };
};