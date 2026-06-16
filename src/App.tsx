import { useWebMcpTool } from './lib/webmcp';
import { acmeTools } from './tools/acmeTools';
import { company } from './data/company';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Products } from './sections/Products';
import { Contact } from './sections/Contact';

function App() {
  // Register the read-only tools. Hooks must be called unconditionally
  // (constant count and order), so we index into a fixed array.
  useWebMcpTool(acmeTools[0]!);
  useWebMcpTool(acmeTools[1]!);
  useWebMcpTool(acmeTools[2]!);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
          aria-label="Main"
        >
          <a href="#hero" className="text-lg font-bold text-brand-700">
            {company.name}
          </a>
          <ul className="hidden gap-6 text-sm font-medium text-slate-600 sm:flex">
            <li>
              <a href="#about" className="hover:text-brand-700">
                About
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-brand-700">
                Products
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-brand-700">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Hero />
        <About />
        <Products />
        <Contact />
      </main>

      <footer className="border-t border-slate-200 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 {company.name} — WebMCP demo. All data is fictional.
      </footer>
    </div>
  );
}

export default App;
