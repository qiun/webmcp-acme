import { useState, type FormEvent } from 'react';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  viaAgent: boolean;
}

/**
 * Contact form as a DECLARATIVE WebMCP tool.
 * The `toolname` / `tooldescription` / `toolparamdescription` attributes turn the <form>
 * into a tool without a single line of registering JavaScript.
 * `toolautosubmit="false"` => the agent fills the fields, but a human clicks Send.
 */
export function ContactForm() {
  const [sent, setSent] = useState<ContactPayload | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // FormData.get() returns string | File | null — we keep only text values.
    const str = (key: string): string => {
      const v = data.get(key);
      return typeof v === 'string' ? v : '';
    };
    // Heuristic: whether the last fill came from an agent.
    const viaAgent = Boolean((e.nativeEvent as unknown as { agentInvoked?: boolean }).agentInvoked);

    const payload: ContactPayload = {
      name: str('name'),
      email: str('email'),
      subject: str('subject'),
      message: str('message'),
      viaAgent,
    };

    // Mock submission — no backend.
    console.log('[submit_contact_form] sent:', payload);
    setSent(payload);
    form.reset();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <form
        toolname="submit_contact_form"
        tooldescription="Sends a message to ACME via the contact form. Fields: full name, email, subject, message."
        toolautosubmit="false"
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="name"
            name="name"
            toolparamdescription="Full name of the sender"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            toolparamdescription="Email address for the reply"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            toolparamdescription="Subject of the message"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            toolparamdescription="Body of the message"
            required
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Send
        </button>
      </form>

      <div aria-live="polite" className="mt-4">
        {sent && (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
            Thank you, {sent.name || 'message sent'}! Your message “{sent.subject}” has been sent
            {sent.viaAgent ? ' (via an AI agent)' : ''}. We will reply to {sent.email}.
          </p>
        )}
      </div>
    </div>
  );
}
