// Answers given before signing in are kept here, so they survive the redirect
// to Google/Apple and can be saved to the account once it exists.
const KEY = "pomi_onboarding_draft";

export function readOnboardingDraft() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeOnboardingDraft(draft) {
  window.localStorage.setItem(KEY, JSON.stringify(draft));
}

export function clearOnboardingDraft() {
  window.localStorage.removeItem(KEY);
}