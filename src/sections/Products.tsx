import { company } from '../data/company';

export function Products() {
  return (
    <section id="products" className="bg-slate-50 px-6 py-20" aria-labelledby="products-heading">
      <div className="mx-auto max-w-5xl">
        <h2 id="products-heading" className="text-3xl font-bold tracking-tight text-slate-900">
          Products and services
        </h2>
        <p className="mt-2 text-slate-600">Selected items from our offering.</p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {company.products.map((p) => (
            <li
              key={p.name}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{p.description}</p>
              <p className="mt-4 font-semibold text-brand-700">
                from {p.priceFrom.toLocaleString('en-US')} {p.currency}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
