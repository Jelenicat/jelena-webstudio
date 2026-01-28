export function loadAnalytics() {
  const MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

  if (!MEASUREMENT_ID) {
    console.warn("Missing VITE_GA_ID");
    return;
  }

  if (window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
  });
}
