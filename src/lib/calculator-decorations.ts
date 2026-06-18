export type CalculatorDecoration = {
  category: string;
  tags: string[];
};

export const calculatorDecorations: Record<string, CalculatorDecoration> = {
  roas: { category: "Ad Performance", tags: ["ROAS", "Ecommerce"] },
  cpa: { category: "Ad Performance", tags: ["Acquisition", "Performance"] },
  cpm: { category: "Media Buying", tags: ["Awareness", "Paid Media"] },
  ctr: { category: "Ad Performance", tags: ["Creative", "Engagement"] },
  "conversion-rate": { category: "CRO", tags: ["Funnels", "Optimization"] },
  "break-even-roas": { category: "Finance", tags: ["Profitability", "Ecommerce"] },
  "facebook-ads-cost": { category: "Social Media", tags: ["Facebook Ads", "Paid Social"] },
  "tiktok-ads-cost": { category: "Social Media", tags: ["TikTok Ads", "Paid Social"] },
  "google-ads-budget": { category: "Search Ads", tags: ["Google Ads", "Budget"] },
  "email-marketing-roi": { category: "Email Marketing", tags: ["Lifecycle", "ROI"] },
  ltv: { category: "Finance", tags: ["Retention", "Revenue"] },
  cac: { category: "Ad Performance", tags: ["Acquisition", "Finance"] },
  "bounce-rate": { category: "CRO", tags: ["Analytics", "Landing Pages"] },
  "impression-share": { category: "Search Ads", tags: ["Visibility", "Auction"] },
  "quality-score": { category: "Search Ads", tags: ["Google Ads", "Quality"] },
  "ad-frequency": { category: "Social Media", tags: ["Reach", "Frequency"] },
  "video-view-rate": { category: "Social Media", tags: ["Video Ads", "Engagement"] },
  "landing-page-conversion-rate": { category: "CRO", tags: ["Landing Pages", "Optimization"] },
  cpv: { category: "Video Ads", tags: ["CPV", "Awareness"] },
  "marketing-roi": { category: "Finance", tags: ["ROI", "Performance"] },
};

export function getCalculatorDecoration(slug: string): CalculatorDecoration {
  return calculatorDecorations[slug] ?? { category: "Marketing", tags: ["Calculator"] };
}
