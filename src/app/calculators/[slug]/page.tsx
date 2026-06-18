import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorPageClient } from "@/components/calculator-page-client";
import { calculatorSlugs, getCalculatorBySlug } from "@/lib/calculators";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return calculatorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {
      title: "Calculator not found",
      description: "The requested calculator does not exist.",
    };
  }

  return {
    title: calculator.name,
    description: calculator.metaDescription,
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;

  if (!getCalculatorBySlug(slug)) {
    notFound();
  }

  return <CalculatorPageClient slug={slug} />;
}
