// Google AdSense configuration.
// Paste your own values from your AdSense account to start serving real ads.
// Until both are filled in, ad slots render a quiet placeholder instead.
export const ADSENSE_CLIENT = ""; // e.g. "ca-pub-1234567890123456"
export const ADSENSE_SLOT = ""; // the ad unit's data-ad-slot

export const adsConfigured = () => Boolean(ADSENSE_CLIENT && ADSENSE_SLOT);

let loading = null;

// Loads the AdSense script once, the first time an ad slot is rendered.
export const loadAdSense = () => {
  if (window.adsbygoogle) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });
  return loading;
};