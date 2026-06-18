import type { CalculatorDefinition } from "@/lib/calculators";

const toNumber = (value: number) => (Number.isFinite(value) ? value : 0);
const safeDivide = (numerator: number, denominator: number) =>
  denominator === 0 ? 0 : numerator / denominator;

export const additionalCalculators: CalculatorDefinition[] = [
  {
    slug: "ltv",
    name: "LTV Calculator",
    icon: "🧮",
    description: "Estimate the lifetime value a customer generates over their relationship with your brand.",
    metaDescription:
      "Calculate customer lifetime value in real time using average order value, purchase frequency, lifespan, and gross margin.",
    formula: "LTV = AOV x Purchase Frequency x Lifespan x Gross Margin %",
    formulaNote:
      "LTV helps you understand how much revenue and profit one customer can produce over time.",
    fields: [
      { key: "averageOrderValue", label: "Average order value", kind: "currency", defaultValue: 80, help: "Average value of one purchase.", step: 5, min: 0 },
      { key: "purchaseFrequency", label: "Purchase frequency", kind: "number", defaultValue: 4, help: "How many times a customer buys during the period.", step: 0.1, min: 0 },
      { key: "customerLifespanYears", label: "Customer lifespan (years)", kind: "number", defaultValue: 3, help: "Expected relationship length with the customer.", step: 0.1, min: 0 },
      { key: "grossMargin", label: "Gross margin %", kind: "percent", defaultValue: 60, help: "Gross margin after product and fulfillment costs.", step: 0.5, min: 0 },
    ],
    example: {
      summary: "An $80 AOV, 4 purchases per year, 3-year lifespan, and 60% margin gives an LTV of $576.",
      inputs: [
        { label: "Average order value", value: "$80" },
        { label: "Purchase frequency", value: "4" },
        { label: "Customer lifespan", value: "3 years" },
        { label: "Gross margin", value: "60%" },
      ],
    },
    faq: [
      { question: "Why does LTV matter?", answer: "LTV tells you how much a customer is worth over time, which helps you set acquisition budgets and retention goals." },
      { question: "Should I use revenue or profit for LTV?", answer: "Profit-based LTV is more conservative because it accounts for margins, which is better for budget planning." },
      { question: "How can I raise LTV?", answer: "Increase repeat purchase frequency, improve retention, raise order value, and build stronger post-purchase journeys." },
    ],
    relatedSlugs: ["cac", "marketing-roi", "break-even-roas"],
    compute: ({ averageOrderValue, purchaseFrequency, customerLifespanYears, grossMargin }) => {
      const lifetimeRevenue = averageOrderValue * purchaseFrequency * customerLifespanYears;
      const ltv = lifetimeRevenue * safeDivide(grossMargin, 100);
      const grossProfit = lifetimeRevenue * safeDivide(grossMargin, 100);
      return [
        { label: "LTV", value: toNumber(ltv), kind: "currency", helper: "Profit-adjusted lifetime value of one customer." },
        { label: "Lifetime revenue", value: toNumber(lifetimeRevenue), kind: "currency", helper: "Total revenue before margin is applied." },
        { label: "Gross profit", value: toNumber(grossProfit), kind: "currency", helper: "Profit contribution over the customer's lifespan." },
      ];
    },
  },
  {
    slug: "cac",
    name: "CAC Calculator",
    icon: "🎯",
    description: "Calculate how much it costs to acquire each new customer.",
    metaDescription:
      "Measure customer acquisition cost by dividing total marketing spend by the number of new customers acquired.",
    formula: "CAC = Total Marketing Spend / New Customers",
    formulaNote:
      "CAC is one of the clearest ways to judge acquisition efficiency and sales economics.",
    fields: [
      { key: "totalSpend", label: "Total marketing spend", kind: "currency", defaultValue: 5000, help: "Total spend across paid media and acquisition efforts.", step: 50, min: 0 },
      { key: "newCustomers", label: "New customers", kind: "number", defaultValue: 100, help: "Number of customers acquired in the period.", step: 1, min: 0 },
    ],
    example: {
      summary: "If you spend $5,000 and win 100 new customers, your CAC is $50.",
      inputs: [
        { label: "Total marketing spend", value: "$5,000" },
        { label: "New customers", value: "100" },
      ],
    },
    faq: [
      { question: "How is CAC different from CPA?", answer: "CAC specifically measures the cost to acquire a customer, while CPA can describe any desired action such as a lead or sale." },
      { question: "What is a good CAC?", answer: "A good CAC depends on your LTV, margins, and payback period, so compare CAC to customer value instead of a universal benchmark." },
      { question: "How do I lower CAC?", answer: "Improve targeting, reduce wasted spend, raise conversion rates, and strengthen retention so each customer is worth more." },
    ],
    relatedSlugs: ["ltv", "roas", "cpa"],
    compute: ({ totalSpend, newCustomers }) => {
      const cac = safeDivide(totalSpend, newCustomers);
      return [
        { label: "CAC", value: toNumber(cac), kind: "currency", helper: "Average cost to acquire one customer." },
        { label: "Customers per $1,000", value: toNumber(safeDivide(newCustomers, totalSpend) * 1000), kind: "number", helper: "How many customers $1,000 of spend can produce." },
        { label: "Spend per customer", value: toNumber(cac), kind: "currency", helper: "Same value as CAC, shown as spend per customer." },
      ];
    },
  },
  {
    slug: "bounce-rate",
    name: "Bounce Rate Calculator",
    icon: "↩️",
    description: "Measure the share of visits that leave after viewing only one page.",
    metaDescription:
      "Calculate bounce rate from single-page sessions and total sessions to assess landing page quality and traffic fit.",
    formula: "Bounce Rate = (Single-page Sessions / Total Sessions) x 100",
    formulaNote:
      "Bounce rate is useful for spotting traffic mismatches and landing pages that do not hold attention.",
    fields: [
      { key: "singlePageSessions", label: "Single-page sessions", kind: "number", defaultValue: 2400, help: "Sessions that ended after one page.", step: 1, min: 0 },
      { key: "totalSessions", label: "Total sessions", kind: "number", defaultValue: 8000, help: "All sessions in the reporting period.", step: 1, min: 0 },
    ],
    example: {
      summary: "2,400 single-page sessions out of 8,000 total sessions equals a 30% bounce rate.",
      inputs: [
        { label: "Single-page sessions", value: "2,400" },
        { label: "Total sessions", value: "8,000" },
      ],
    },
    faq: [
      { question: "Is bounce rate always bad?", answer: "Not necessarily. Some pages answer the user's question immediately, so a quick exit is not always a problem." },
      { question: "How can I reduce bounce rate?", answer: "Improve page speed, match the ad promise to the landing page, and make the next step obvious." },
      { question: "What is the difference between bounce rate and exit rate?", answer: "Bounce rate measures one-page sessions, while exit rate measures the percentage of exits from a specific page." },
    ],
    relatedSlugs: ["landing-page-conversion-rate", "ctr", "video-view-rate"],
    compute: ({ singlePageSessions, totalSessions }) => {
      const bounceRate = safeDivide(singlePageSessions, totalSessions) * 100;
      return [
        { label: "Bounce rate", value: toNumber(bounceRate), kind: "percent", helper: "Share of sessions that viewed only one page." },
        { label: "Engaged sessions", value: toNumber(totalSessions - singlePageSessions), kind: "number", helper: "Sessions that went beyond the first page." },
        { label: "Non-bounce rate", value: toNumber(100 - bounceRate), kind: "percent", helper: "Share of sessions that continued to another page." },
      ];
    },
  },
  {
    slug: "impression-share",
    name: "Impression Share Calculator",
    icon: "🧭",
    description: "See how often your ads are showing relative to the total eligible impression pool.",
    metaDescription:
      "Estimate impression share to understand visibility, auction competitiveness, and missed opportunity in search or paid media.",
    formula: "Impression Share = (Impressions / Eligible Impressions) x 100",
    formulaNote:
      "Impression share shows how much of the available market you are actually capturing.",
    fields: [
      { key: "impressions", label: "Impressions", kind: "number", defaultValue: 42000, help: "The number of impressions your ads received.", step: 100, min: 0 },
      { key: "eligibleImpressions", label: "Eligible impressions", kind: "number", defaultValue: 100000, help: "The total impression opportunities available.", step: 100, min: 0 },
    ],
    example: {
      summary: "42,000 impressions out of 100,000 eligible impressions gives you 42% impression share.",
      inputs: [
        { label: "Impressions", value: "42,000" },
        { label: "Eligible impressions", value: "100,000" },
      ],
    },
    faq: [
      { question: "Why does impression share matter?", answer: "It shows how much demand you are actually capturing and where you may be losing visibility to competitors." },
      { question: "How can I improve impression share?", answer: "Raise budgets, improve bids, sharpen relevance, and strengthen ad quality to win more auctions." },
      { question: "Does high impression share always mean success?", answer: "No. High visibility only matters if the traffic is profitable and aligned to your goals." },
    ],
    relatedSlugs: ["quality-score", "google-ads-budget", "cpm"],
    compute: ({ impressions, eligibleImpressions }) => {
      const impressionShare = safeDivide(impressions, eligibleImpressions) * 100;
      return [
        { label: "Impression share", value: toNumber(impressionShare), kind: "percent", helper: "Share of available impressions you captured." },
        { label: "Missed impressions", value: toNumber(eligibleImpressions - impressions), kind: "number", helper: "Impressions you did not receive." },
        { label: "Eligible market size", value: toNumber(eligibleImpressions), kind: "number", helper: "Total available impression opportunities." },
      ];
    },
  },
  {
    slug: "quality-score",
    name: "Quality Score Estimator",
    icon: "⭐",
    description: "Estimate your ad quality score from CTR, relevance, and landing page experience.",
    metaDescription:
      "Estimate Google Ads quality score using expected CTR, ad relevance, and landing page experience inputs.",
    formula: "Quality Score = Average of CTR, Ad Relevance, and Landing Page Experience",
    formulaNote:
      "This estimator gives a simple directional score for ad quality and landing page alignment.",
    fields: [
      { key: "expectedCtr", label: "Expected CTR (1-10)", kind: "number", defaultValue: 7, help: "How strong the ad click expectation is.", step: 0.1, min: 1 },
      { key: "adRelevance", label: "Ad relevance (1-10)", kind: "number", defaultValue: 8, help: "How well the ad matches the keyword or audience intent.", step: 0.1, min: 1 },
      { key: "landingPageExp", label: "Landing page experience (1-10)", kind: "number", defaultValue: 6, help: "How useful and relevant the landing page feels.", step: 0.1, min: 1 },
    ],
    example: {
      summary: "A 7, 8, and 6 score mix produces an estimated quality score of 7.0 out of 10.",
      inputs: [
        { label: "Expected CTR", value: "7" },
        { label: "Ad relevance", value: "8" },
        { label: "Landing page experience", value: "6" },
      ],
    },
    faq: [
      { question: "Is this the official Google Ads quality score?", answer: "No. It is a practical estimator that helps you reason about quality and diagnose where improvement may be needed." },
      { question: "How do I improve quality score?", answer: "Align keywords, ad copy, and landing pages more closely and focus on better expected CTR signals." },
      { question: "Does quality score affect CPC?", answer: "Yes. Stronger quality can improve auction efficiency and help reduce costs over time." },
    ],
    relatedSlugs: ["impression-share", "google-ads-budget", "ctr"],
    compute: ({ expectedCtr, adRelevance, landingPageExp }) => {
      const qualityScore = (expectedCtr + adRelevance + landingPageExp) / 3;
      return [
        { label: "Quality score", value: toNumber(qualityScore), kind: "number", helper: "Average score across the three quality factors." },
        { label: "Improvement gap", value: toNumber(10 - qualityScore), kind: "number", helper: "Distance to a perfect 10." },
        { label: "Quality index", value: toNumber((qualityScore / 10) * 100), kind: "percent", helper: "Normalized score as a percentage." },
      ];
    },
  },
  {
    slug: "ad-frequency",
    name: "Ad Frequency Calculator",
    icon: "🔁",
    description: "Measure how often people see the same ad across a campaign.",
    metaDescription:
      "Calculate ad frequency using impressions and reach to monitor repetition, fatigue, and saturation.",
    formula: "Frequency = Impressions / Reach",
    formulaNote:
      "Frequency helps you spot overexposure or determine whether an audience is seeing your ad enough times.",
    fields: [
      { key: "impressions", label: "Impressions", kind: "number", defaultValue: 50000, help: "How many times the ad was shown.", step: 1000, min: 0 },
      { key: "reach", label: "Reach", kind: "number", defaultValue: 10000, help: "How many unique people saw the ad.", step: 100, min: 0 },
    ],
    example: {
      summary: "50,000 impressions and 10,000 reach gives you a frequency of 5.0.",
      inputs: [
        { label: "Impressions", value: "50,000" },
        { label: "Reach", value: "10,000" },
      ],
    },
    faq: [
      { question: "What is a healthy ad frequency?", answer: "It depends on the channel and campaign goal, but rising frequency can signal fatigue if performance declines." },
      { question: "Why does frequency matter?", answer: "It shows whether your audience is seeing the ad enough to remember it or too much to stay engaged." },
      { question: "How do I control frequency?", answer: "Expand your audience, refresh creatives, or adjust campaign pacing and retargeting windows." },
    ],
    relatedSlugs: ["video-view-rate", "impression-share", "cpm"],
    compute: ({ impressions, reach }) => {
      const frequency = safeDivide(impressions, reach);
      return [
        { label: "Frequency", value: toNumber(frequency), kind: "multiple", helper: "Average number of times each person saw the ad." },
        { label: "Reach rate", value: toNumber(safeDivide(reach, impressions) * 100), kind: "percent", helper: "Share of impressions that reached unique people." },
        { label: "Extra impressions", value: toNumber(impressions - reach), kind: "number", helper: "Impressions beyond the first exposure." },
      ];
    },
  },
  {
    slug: "video-view-rate",
    name: "Video View Rate Calculator",
    icon: "🎬",
    description: "Measure how many impressions turn into actual video views.",
    metaDescription:
      "Calculate video view rate from video views and impressions to evaluate creative hook strength and engagement.",
    formula: "Video View Rate = (Video Views / Impressions) x 100",
    formulaNote:
      "A strong view rate usually means the opening seconds of your video are doing their job.",
    fields: [
      { key: "videoViews", label: "Video views", kind: "number", defaultValue: 18000, help: "Number of views your video received.", step: 1, min: 0 },
      { key: "impressions", label: "Impressions", kind: "number", defaultValue: 100000, help: "Number of times the video was shown.", step: 1000, min: 0 },
    ],
    example: {
      summary: "18,000 views from 100,000 impressions creates an 18% video view rate.",
      inputs: [
        { label: "Video views", value: "18,000" },
        { label: "Impressions", value: "100,000" },
      ],
    },
    faq: [
      { question: "Why is video view rate important?", answer: "It shows whether your creative is strong enough to earn attention past the first impression." },
      { question: "How can I improve view rate?", answer: "Use a stronger hook, move the brand message sooner, and keep the video tight and clear." },
      { question: "Is view rate the same as completion rate?", answer: "No. View rate measures views from impressions, while completion rate measures how many viewers watched all or most of the video." },
    ],
    relatedSlugs: ["ad-frequency", "cpm", "ctr"],
    compute: ({ videoViews, impressions }) => {
      const viewRate = safeDivide(videoViews, impressions) * 100;
      return [
        { label: "Video view rate", value: toNumber(viewRate), kind: "percent", helper: "Share of impressions that became views." },
        { label: "Views per 1,000 impressions", value: toNumber(safeDivide(videoViews, impressions) * 1000), kind: "number", helper: "View volume normalized to 1,000 impressions." },
        { label: "Non-view impressions", value: toNumber(impressions - videoViews), kind: "number", helper: "Impressions that did not become a view." },
      ];
    },
  },
  {
    slug: "landing-page-conversion-rate",
    name: "Landing Page Conversion Rate Calculator",
    icon: "🛬",
    description: "Measure the percentage of landing page visitors who convert.",
    metaDescription:
      "Calculate landing page conversion rate from visitors and conversions to evaluate page effectiveness and offer fit.",
    formula: "Landing Page Conversion Rate = (Conversions / Visitors) x 100",
    formulaNote:
      "This metric helps you diagnose landing page performance independent of ad platform noise.",
    fields: [
      { key: "conversions", label: "Conversions", kind: "number", defaultValue: 120, help: "Number of desired actions on the page.", step: 1, min: 0 },
      { key: "landingPageVisitors", label: "Landing page visitors", kind: "number", defaultValue: 3000, help: "Visitors who reached the page.", step: 1, min: 0 },
    ],
    example: {
      summary: "120 conversions from 3,000 visitors equals a 4% landing page conversion rate.",
      inputs: [
        { label: "Conversions", value: "120" },
        { label: "Landing page visitors", value: "3,000" },
      ],
    },
    faq: [
      { question: "How is this different from overall conversion rate?", answer: "Landing page conversion rate measures just the page, while overall conversion rate can span the whole funnel." },
      { question: "What is a good landing page conversion rate?", answer: "It varies by industry, offer, and traffic source, so compare against your own history and the specific traffic mix." },
      { question: "How do I improve it?", answer: "Reduce friction, sharpen the value proposition, strengthen social proof, and keep the CTA clear." },
    ],
    relatedSlugs: ["bounce-rate", "conversion-rate", "cpa"],
    compute: ({ conversions, landingPageVisitors }) => {
      const rate = safeDivide(conversions, landingPageVisitors) * 100;
      return [
        { label: "Conversion rate", value: toNumber(rate), kind: "percent", helper: "Share of visitors that converted." },
        { label: "Conversions per 1,000 visitors", value: toNumber(safeDivide(conversions, landingPageVisitors) * 1000), kind: "number", helper: "Expected conversions normalized to 1,000 visitors." },
        { label: "Visitors per conversion", value: toNumber(safeDivide(landingPageVisitors, conversions)), kind: "number", helper: "How many visitors you need for one conversion." },
      ];
    },
  },
  {
    slug: "cpv",
    name: "Cost Per View Calculator",
    icon: "▶️",
    description: "Calculate what you pay for every video view.",
    metaDescription:
      "Estimate cost per view from total ad spend and video views for video campaigns on social and display platforms.",
    formula: "CPV = Ad Spend / Views",
    formulaNote:
      "CPV is useful when optimizing for video views, reach, and attention instead of clicks.",
    fields: [
      { key: "adSpend", label: "Ad spend", kind: "currency", defaultValue: 750, help: "Total spend on the video campaign.", step: 10, min: 0 },
      { key: "views", label: "Views", kind: "number", defaultValue: 25000, help: "Number of counted views.", step: 1, min: 0 },
    ],
    example: {
      summary: "A $750 spend and 25,000 views gives you a CPV of $0.03.",
      inputs: [
        { label: "Ad spend", value: "$750" },
        { label: "Views", value: "25,000" },
      ],
    },
    faq: [
      { question: "When should I use CPV?", answer: "Use CPV when the campaign goal is attention, awareness, or video engagement rather than direct conversions." },
      { question: "Is lower CPV always better?", answer: "Only if the views are real and relevant. Cheap views that do not help the business goal are not useful." },
      { question: "How do I lower CPV?", answer: "Improve the first seconds of the video, tighten targeting, and test multiple thumbnails or openings." },
    ],
    relatedSlugs: ["video-view-rate", "cpm", "marketing-roi"],
    compute: ({ adSpend, views }) => {
      const cpv = safeDivide(adSpend, views);
      return [
        { label: "CPV", value: toNumber(cpv), kind: "currency", helper: "Average cost for one view." },
        { label: "Views per $1,000", value: toNumber(safeDivide(views, adSpend) * 1000), kind: "number", helper: "How many views $1,000 buys." },
        { label: "Cost per 1,000 views", value: toNumber(cpv * 1000), kind: "currency", helper: "Equivalent CPM for the video campaign." },
      ];
    },
  },
  {
    slug: "marketing-roi",
    name: "Marketing ROI Calculator",
    icon: "💹",
    description: "Measure the profitability of your marketing spend after costs are accounted for.",
    metaDescription:
      "Calculate marketing ROI by comparing revenue to total cost and estimate profit and return multiple.",
    formula: "ROI = ((Revenue - Cost) / Cost) x 100",
    formulaNote:
      "ROI tells you how much profit your marketing is producing for each dollar invested.",
    fields: [
      { key: "revenue", label: "Revenue", kind: "currency", defaultValue: 20000, help: "Revenue attributed to the campaign or channel.", step: 50, min: 0 },
      { key: "cost", label: "Total cost", kind: "currency", defaultValue: 8000, help: "All costs tied to the campaign.", step: 50, min: 0 },
    ],
    example: {
      summary: "If revenue is $20,000 and cost is $8,000, your marketing ROI is 150%.",
      inputs: [
        { label: "Revenue", value: "$20,000" },
        { label: "Total cost", value: "$8,000" },
      ],
    },
    faq: [
      { question: "Why use ROI instead of ROAS?", answer: "ROI includes cost and profit, while ROAS only compares revenue to ad spend. ROI is the broader business metric." },
      { question: "Can ROI be negative?", answer: "Yes. If costs exceed revenue, ROI turns negative and signals that the campaign is losing money." },
      { question: "How do I improve ROI?", answer: "Increase revenue, reduce cost, improve conversion rate, and focus spend on the highest-value channels." },
    ],
    relatedSlugs: ["roas", "ltv", "cac"],
    compute: ({ revenue, cost }) => {
      const profit = revenue - cost;
      const roi = safeDivide(profit, cost) * 100;
      return [
        { label: "ROI", value: toNumber(roi), kind: "percent", helper: "Return on investment after costs." },
        { label: "Profit", value: toNumber(profit), kind: "currency", helper: "Revenue minus total cost." },
        { label: "Revenue multiple", value: toNumber(safeDivide(revenue, cost)), kind: "multiple", helper: "Revenue earned for each dollar spent." },
      ];
    },
  },
];
