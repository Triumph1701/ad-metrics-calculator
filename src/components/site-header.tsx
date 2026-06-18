import Link from "next/link";

type SiteHeaderProps = {
  transparent?: boolean;
};

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  return (
    <header
      className={
        transparent
          ? "border-b border-slate-200 bg-white/70 text-black backdrop-blur"
          : "border-b border-slate-200 bg-white/90 text-black backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-bold tracking-tight text-black">
          <span
            className={
              transparent
                ? "flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-white text-lg"
                : "flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-white text-lg"
            }
          >
            📊
          </span>
          <span className="text-base font-bold text-black sm:text-lg">Ad Metrics Calculator</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-bold">
          <Link
            href="/"
            className={
              transparent
                ? "text-black transition hover:text-slate-950"
                : "text-black transition hover:text-slate-950"
            }
          >
            Home
          </Link>
          <Link
            href="/#calculators"
            className={
              transparent
                ? "text-black transition hover:text-slate-950"
                : "text-black transition hover:text-slate-950"
            }
          >
            Calculators
          </Link>
        </nav>
      </div>
    </header>
  );
}
