export const pageview = (url: URL) => {
  if (typeof window.gtag === 'undefined') return;

  window.gtag('config', 'G-434QYEFZM3' as string, {
    page_path: url,
  });
};

interface GTagEventProps {
  action: string;
  category: string;
  label: string;
  value: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEventProps) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
