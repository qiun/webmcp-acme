import { MapPin, Target } from 'lucide-react';
import { company } from '../data/company';

export function About() {
  return (
    <section id="about" className="px-6 py-20" aria-labelledby="about-heading">
      <div className="mx-auto max-w-4xl">
        <h2 id="about-heading" className="text-3xl font-bold tracking-tight text-slate-900">
          About us
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{company.about}</p>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-6">
            <dt className="flex items-center gap-2 font-semibold text-slate-900">
              <Target className="h-5 w-5 text-brand-600" aria-hidden="true" />
              Mission
            </dt>
            <dd className="mt-2 text-slate-600">{company.mission}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 p-6">
            <dt className="flex items-center gap-2 font-semibold text-slate-900">
              <MapPin className="h-5 w-5 text-brand-600" aria-hidden="true" />
              Location
            </dt>
            <dd className="mt-2 text-slate-600">{company.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
