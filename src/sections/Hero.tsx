import { company } from '../data/company';

export function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-b from-brand-50 to-white px-6 py-24 sm:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
          {company.name}
        </p>
        <h1
          id="hero-heading"
          className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl"
        >
          {company.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">{company.about}</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Get in touch
          </a>
          <a
            href="#products"
            className="rounded-lg px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            See our products →
          </a>
        </div>
      </div>
    </section>
  );
}
