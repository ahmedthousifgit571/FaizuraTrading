import type { MetadataRoute } from "next";

const SITE = "https://faizura-trading.sg";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`,            lastModified: now, changeFrequency: "daily",   priority: 1 },
    { url: `${SITE}/#converter`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/#rates`,      lastModified: now, changeFrequency: "hourly",  priority: 0.9 },
    { url: `${SITE}/#services`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/#about`,      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/#locations`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/#blogs`,      lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${SITE}/#contact`,    lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
