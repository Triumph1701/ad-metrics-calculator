import type { MetadataRoute } from "next";
import { calculatorSlugs } from "@/lib/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...calculatorSlugs.map((slug) => ({
      url: `${siteUrl}/calculators/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
