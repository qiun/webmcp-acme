# webmcp-acme

A landing page for the fictional company **ACME** — it works normally for humans **and**
responds to AI agents via **WebMCP**. The simplest of the four playground projects: it showcases
the **Declarative API** (a contact form as a tool without JS) plus lightweight read-only tools.

## Why this exists

This is one of **four open demo sites built specifically to be _agent-ready_ via WebMCP**.
We publish them so that anyone building AI browser agents — or working on the WebMCP standard
and the [MCP-B](https://github.com/WebMCP-org) polyfill itself — has **realistic, end-to-end
targets to test against**, not toy pages. Every user journey here (browse company info, read the
offer, **submit a contact form**) can be completed by a human in the UI **and** driven entirely by
an AI agent through WebMCP tools, with human-in-the-loop confirmation where it matters.

The goal is simple: make it easy to verify that an agent can _really_ operate a WebMCP-enabled
site, end to end. Fork it, point your agent at it, and see what works.

**WebMCP demo set:**
[acme](https://github.com/qiun/webmcp-acme) ·
[shop](https://github.com/qiun/webmcp-shop) ·
[stays](https://github.com/qiun/webmcp-stays) ·
[airline](https://github.com/qiun/webmcp-airline)

## Stack

- Vite + React 18 + TypeScript (`strict`)
- Tailwind CSS, `lucide-react`
- `zod` (lightweight validation), the **MCP-B** polyfill (`@mcp-b/global`)
- No backend — data lives in `src/data/company.ts`, and the submitted form is a mock (log + toast).

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production
pnpm lint       # ESLint (react-hooks + jsx-a11y)
pnpm typecheck  # TypeScript strict
```

## WebMCP tools

| Tool | Type | Description |
|---|---|---|
| `get_company_info` | read-only | Company description, mission, location |
| `list_products` | read-only | List of products with "from" prices |
| `get_contact_info` | read-only | Phone, email, address, hours |
| `submit_contact_form` | **declarative** | Contact form (`toolautosubmit="false"` → a human submits) |

The first three are registered imperatively in `src/App.tsx` via `useWebMcpTool`.
`submit_contact_form` is created **declaratively** — from HTML attributes on the `<form>` in
`src/components/ContactForm.tsx`, with no registering code.

## How to test with an agent

1. **Native Chrome 146+** with the WebMCP flag (`chrome://flags`) — the agent reads the
   read-only tools and can fill in the (declarative) form.
2. **MCP-B polyfill** (loaded automatically by `src/lib/webmcp.ts`) + the
   `@mcp-b/webmcp-local-relay` bridge → connect Hermes / OpenClaw / your own MCP agent.
3. Scenarios: "What does ACME sell?" → `list_products`; "What's the phone number?" →
   `get_contact_info`; "Send a message asking about ACME Drive X" → the agent fills in
   `submit_contact_form` and **waits for a human to click**.

The visible Declarative API states (`:tool-form-active`, `:tool-submit-active`) are in `src/index.css`.

## API stability (June 2026)

WebMCP is a *W3C Community Group Draft Report* — not a standard. Imperative surface:
`document.modelContext.registerTool/unregisterTool` (`navigator.modelContext` deprecated since
Chrome 150). Declarative surface: the `toolname`, `tooldescription`, `toolparamdescription`,
`toolautosubmit` attributes on `<form>`. When the imperative API changes → you fix **only**
`src/lib/webmcp.ts`. Changelog: `developer.chrome.com/docs/ai/webmcp`.

## Deploy

Vercel / Netlify / GitHub Pages. HTTPS required (WebMCP works only in a secure context).
Set `Content-Type: application/json` for `/.well-known/webmcp`.

## License

MIT — see [LICENSE](./LICENSE).
