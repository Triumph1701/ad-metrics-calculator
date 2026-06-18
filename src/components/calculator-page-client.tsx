"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { calculators, getCalculatorBySlug } from "@/lib/calculators";
import { getCalculatorDecoration } from "@/lib/calculator-decorations";

type CalculatorPageClientProps = {
  slug: string;
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function formatValue(value: number, kind: "currency" | "number" | "percent" | "multiple") {
  if (!Number.isFinite(value)) {
    return "--";
  }

  switch (kind) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: Math.abs(value) < 1 ? 4 : 2,
        minimumFractionDigits: Math.abs(value) < 1 ? 4 : 2,
      }).format(value);
    case "percent":
      return `${numberFormatter.format(value)}%`;
    case "multiple":
      return `${numberFormatter.format(value)}x`;
    default:
      return numberFormatter.format(value);
  }
}

export function CalculatorPageClient({ slug }: CalculatorPageClientProps) {
  const calculator = getCalculatorBySlug(slug) ?? calculators[0];
  const decoration = getCalculatorDecoration(calculator.slug);

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      calculator.fields.map((field) => [field.key, String(field.defaultValue)]),
    ),
  );

  const numericValues = useMemo(
    () =>
      Object.fromEntries(
        calculator.fields.map((field) => [
          field.key,
          Number.parseFloat(values[field.key] || String(field.defaultValue)) || 0,
        ]),
      ),
    [calculator.fields, values],
  );

  const outputs = calculator.compute(numericValues);
  const relatedCalculators = calculator.relatedSlugs
    .map((relatedSlug) => getCalculatorBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main className="min-h-screen bg-slate-50 text-black">
      <div className="absolute inset-x-0 top-0 -z-10 h-[18rem] bg-gradient-to-b from-sky-50 via-white to-slate-50" />
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm font-bold text-black">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-slate-950">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-800">
              /
            </li>
            <li>
              <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-black">
                {decoration.category}
              </span>
            </li>
            <li aria-hidden="true" className="text-slate-800">
              /
            </li>
            <li className="text-slate-950">{calculator.name}</li>
          </ol>
        </nav>

        <div className="mb-6 rounded-3xl border border-slate-300 bg-white p-8 shadow-sm shadow-slate-200/60">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-bold text-black">
              {calculator.icon} {calculator.name}
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 font-bold text-black">
              {decoration.category}
            </span>
            {decoration.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-300 bg-white px-3 py-1 font-bold text-black">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
                {calculator.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-black">
                {calculator.description}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-black">Formula</p>
              <p className="mt-2 font-mono text-sm font-semibold leading-6 text-black">{calculator.formula}</p>
              <p className="mt-3 text-sm leading-6 text-black">{calculator.formulaNote}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <section className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5">
              <h2 className="text-xl font-extrabold text-black">Calculator inputs</h2>
              <p className="mt-2 text-base leading-7 text-black">
                Update the fields below and the results refresh instantly.
              </p>

              <form className="mt-6 grid gap-4 sm:grid-cols-2">
                {calculator.fields.map((field) => (
                  <label key={field.key} className="space-y-2">
                    <span className="flex items-center justify-between text-sm font-bold text-black">
                      <span>{field.label}</span>
                      <span className="text-xs font-bold text-black">
                        {field.kind === "currency"
                          ? "USD"
                          : field.kind === "percent"
                            ? "%"
                            : "Count"}
                      </span>
                    </span>
                    <input
                      type="number"
                      min={field.min}
                      step={field.step ?? 1}
                      inputMode={field.kind === "number" ? "numeric" : "decimal"}
                      value={values[field.key] ?? ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-black bg-white px-4 py-3 text-black shadow-sm outline-none transition placeholder:text-slate-800 focus:border-black focus:ring-4 focus:ring-slate-200"
                    />
                    <span className="block text-xs leading-5 text-slate-800">{field.help}</span>
                  </label>
                ))}
              </form>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-300 bg-white p-6 text-black shadow-sm shadow-slate-200/60">
              <h2 className="text-xl font-extrabold text-black">Live results</h2>
              <dl className="mt-6 grid gap-4">
                {outputs.map((output) => (
                  <div
                    key={output.label}
                    className="rounded-2xl border border-slate-300 bg-slate-50 p-5 transition hover:border-slate-500 hover:bg-white"
                  >
                    <dt className="text-sm font-bold text-black">{output.label}</dt>
                    <dd className="mt-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
                      {formatValue(output.value, output.kind)}
                    </dd>
                    <p className="mt-2 text-sm leading-6 text-slate-800">{output.helper}</p>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm shadow-slate-200/60">
              <h2 className="text-lg font-extrabold text-black">Usage example</h2>
              <p className="mt-2 text-sm leading-6 text-black">{calculator.example.summary}</p>
              <div className="mt-4 grid gap-2">
                {calculator.example.inputs.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-black">{item.label}</span>
                    <span className="font-bold text-black">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <article className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm shadow-slate-200/60">
            <h2 className="text-lg font-extrabold text-black">Formula explanation</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-mono text-sm font-semibold text-black">{calculator.formula}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-black">{calculator.formulaNote}</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-black">
              {calculator.fields.map((field) => (
                <p key={field.key}>
                  <span className="font-semibold text-black">{field.label}:</span> {field.help}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm shadow-slate-200/60">
            <h2 className="text-lg font-extrabold text-black">FAQ</h2>
            <div className="mt-4 space-y-3">
              {calculator.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-slate-300 bg-slate-50 p-4 open:bg-white"
                >
                  <summary className="cursor-pointer list-none font-semibold text-black">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-black">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </section>

        <section id="calculators" className="mt-6 rounded-3xl border border-slate-300 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-black">Related calculators</h2>
              <p className="mt-2 text-sm leading-6 text-black">
                Explore a few other tools that pair well with this calculator.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedCalculators.map((related) => (
              <Link
                key={related.slug}
                href={`/calculators/${related.slug}`}
                className="group rounded-2xl border border-slate-300 bg-slate-50 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl">{related.icon}</p>
                    <h3 className="mt-3 font-bold text-black">{related.name}</h3>
                  </div>
                  <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-black shadow-sm">
                    Open
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-black">{related.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
