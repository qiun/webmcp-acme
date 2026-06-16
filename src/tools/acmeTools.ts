import type { ToolDefinition } from '../lib/webmcp';
import { company } from '../data/company';

// Read-only tools take no arguments — empty input schema.
const EMPTY_INPUT = { type: 'object', properties: {}, additionalProperties: false } as const;

const PLN = (n: number) => `${n.toLocaleString('en-US')} PLN`;

export const getCompanyInfoTool: ToolDefinition = {
  name: 'get_company_info',
  description: 'Returns a description of ACME: what it does, its mission, and its location.',
  inputSchema: EMPTY_INPUT,
  annotations: { readOnlyHint: true },
  execute: async () => {
    const { name, tagline, about, mission, location } = company;
    return {
      content: [
        {
          type: 'text',
          text: `${name} — ${tagline}\n\n${about}\n\nMission: ${mission}\nLocation: ${location}`,
        },
      ],
      structuredContent: { name, tagline, about, mission, location },
    };
  },
};

export const listProductsTool: ToolDefinition = {
  name: 'list_products',
  description: 'List of ACME products/services with a short description and a "from" price.',
  inputSchema: EMPTY_INPUT,
  annotations: { readOnlyHint: true },
  execute: async () => {
    const lines = company.products.map(
      (p) => `• ${p.name} — ${p.description} (from ${PLN(p.priceFrom)})`,
    );
    return {
      content: [{ type: 'text', text: `ACME offering:\n${lines.join('\n')}` }],
      structuredContent: { products: company.products },
    };
  },
};

export const getContactInfoTool: ToolDefinition = {
  name: 'get_contact_info',
  description: 'Returns ACME contact details: phone, email, address, and opening hours.',
  inputSchema: EMPTY_INPUT,
  annotations: { readOnlyHint: true },
  execute: async () => {
    const { phone, email, address, hours } = company.contact;
    return {
      content: [
        {
          type: 'text',
          text: `Phone: ${phone}\nEmail: ${email}\nAddress: ${address}\nHours: ${hours}`,
        },
      ],
      structuredContent: company.contact,
    };
  },
};

export const acmeTools: ToolDefinition[] = [
  getCompanyInfoTool,
  listProductsTool,
  getContactInfoTool,
];
