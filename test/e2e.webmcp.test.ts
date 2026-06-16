// @vitest-environment happy-dom
/**
 * E2E przez PRAWDZIWĄ warstwę WebMCP (@mcp-b polyfill).
 * Testuje 3 narzędzia imperatywne. Uwaga: `submit_contact_form` jest DEKLARATYWNE
 * (atrybuty HTML <form>) i działa tylko w natywnym Chrome — poza zakresem tego testu Node.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { registerTool } from '../src/lib/webmcp';
import { acmeTools } from '../src/tools/acmeTools';

interface CallResult {
  content: { type: string; text: string }[];
  structuredContent?: unknown;
}

function shim() {
  const s = (navigator as unknown as { modelContextTesting?: unknown }).modelContextTesting;
  if (!s) throw new Error('navigator.modelContextTesting niedostępne.');
  return s as { listTools: () => unknown[]; executeTool: (n: string, a: string) => Promise<string | null> };
}

async function call(name: string, args: Record<string, unknown> = {}): Promise<CallResult> {
  const raw = await shim().executeTool(name, JSON.stringify(args));
  if (raw === null) throw new Error(`${name}: pusty wynik`);
  return JSON.parse(raw) as CallResult;
}

beforeAll(async () => {
  await import('@mcp-b/global');
  for (const tool of acmeTools) await registerTool(tool);
});

describe('webmcp-acme — e2e przez warstwę WebMCP', () => {
  it('rejestruje 3 narzędzia read-only', () => {
    const names = shim().listTools().map((t) => (t as { name: string }).name);
    expect(names).toEqual(
      expect.arrayContaining(['get_company_info', 'list_products', 'get_contact_info']),
    );
  });

  it('get_company_info zwraca opis firmy', async () => {
    const res = await call('get_company_info');
    const sc = res.structuredContent as { name: string; location: string };
    expect(sc.name).toBeTruthy();
    expect(sc.location).toBeTruthy();
    expect(res.content[0]!.text).toContain(sc.name);
  });

  it('list_products zwraca produkty z cenami', async () => {
    const res = await call('list_products');
    const sc = res.structuredContent as { products: { name: string; priceFrom: number }[] };
    expect(sc.products.length).toBeGreaterThanOrEqual(6);
    expect(sc.products[0]!.priceFrom).toBeGreaterThan(0);
  });

  it('get_contact_info zwraca telefon i e-mail', async () => {
    const res = await call('get_contact_info');
    const sc = res.structuredContent as { phone: string; email: string };
    expect(sc.phone).toBeTruthy();
    expect(sc.email).toContain('@');
  });
});
