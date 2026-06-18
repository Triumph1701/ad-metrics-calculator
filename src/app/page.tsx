import Link from "next/link";
import type { Metadata } from "next";
import GiscusComments from "@/components/GiscusComments";
import { SiteHeader } from "@/components/site-header";
import { calculators } from "@/lib/calculators";
import { getCalculatorDecoration } from "@/lib/calculator-decorations";

export const metadata: Metadata = {
  title: "Ad Metrics Calculator",
  description:
    "A clean marketing calculator website with tools for ROAS, CPA, CPM, CTR, conversion rate, and email ROI.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-black">
      <div className="absolute inset-x-0 top-0 -z-10 h-[22rem] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_50%),linear-gradient(to_bottom,_rgba(255,255,255,1),_rgba(248,250,252,1)_72%)]" />
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
          <div className="text-black">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm">
              <span>Marketing math made fast</span>
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl">
              Ad Metrics Calculator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-black">
              Run real-time calculations for paid media and email marketing. Estimate
              ROAS, CPA, CPM, CTR, conversion rate, break-even ROAS, and platform
              budgets without touching a spreadsheet.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#calculators"
                className="rounded-full border border-slate-300 bg-sky-50 px-5 py-3 text-sm font-bold text-black shadow-sm transition hover:bg-sky-100"
              >
                Browse calculators
              </Link>
              <Link
                href="/calculators/roas"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-black shadow-sm transition hover:bg-slate-50"
              >
                Start with ROAS
              </Link>
            </div>

            <dl className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-sm font-semibold text-black">Calculators</dt>
                <dd className="mt-2 text-2xl font-bold text-black">20</dd>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-sm font-semibold text-black">Pages</dt>
                <dd className="mt-2 text-2xl font-bold text-black">SEO-ready</dd>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <dt className="text-sm font-semibold text-black">Mode</dt>
                <dd className="mt-2 text-2xl font-bold text-black">Instant</dd>
              </div>
            </dl>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-950">
              Why teams use it
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Clean, professional interface for client calls and internal planning",
                "Mobile responsive layout that works anywhere you need a quick answer",
                "No database, no login, no submit button, just fast marketing math",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-6 text-black"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
              About / How to Use
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-black">
              Fast answers for marketing planning, media buying, and reporting
            </h2>
            <p className="mt-3 text-lg leading-8 text-black">
              Choose a calculator, enter your campaign inputs, and read the result
              immediately. Each page includes the formula, a worked example, common
              questions, and related tools so you can move from one metric to the next
              without losing context.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "1. Pick a calculator", text: "Start with the metric you need most." },
              { title: "2. Enter your numbers", text: "Update fields and watch the result recalculate." },
              { title: "3. Compare related tools", text: "Jump to adjacent calculators for a fuller picture." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="calculators" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
              Calculator library
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              All 20 calculators in one place
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-7 text-black">
              Open any tool to calculate performance metrics, platform budgets, or
              return on investment scenarios in real time.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {calculators.map((calculator) => {
            const decoration = getCalculatorDecoration(calculator.slug);
            return (
            <Link
              key={calculator.slug}
              href={`/calculators/${calculator.slug}`}
              className="group rounded-3xl border border-slate-300 bg-white p-6 shadow-sm shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:border-slate-500 hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-2xl">
                    {calculator.icon}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-black">
                      {decoration.category}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-black">
                      {decoration.tags[0]}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-black">
                    {calculator.name}
                  </h3>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-black">
                  Open
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-black">{calculator.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-black">
                <span>Calculate now</span>
                <span className="transition group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
              Feedback & Suggestions
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              Share Your Thoughts
            </h2>
            <p className="mt-3 text-lg leading-8 text-black">
              Questions, ideas, or improvements? Drop them below and we&apos;ll keep refining the calculator suite.
            </p>
          </div>

          <GiscusComments />
        </div>
      </section>

    </main>
  );
}
