'use client';

import { useState } from 'react';

interface FormFields {
  name: string;
  email: string;
  message: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    if (!fields.message.trim()) errs.message = 'Message is required.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';
    const payload: Record<string, string> = {
      name: fields.name,
      email: fields.email,
      message: fields.message,
    };
    if (fields.phone.trim()) {
      payload.phone = fields.phone.trim();
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-8">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p className="text-text-primary text-lg font-medium">
          Thanks! We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === 'error' && (
        <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="cf-name" className="text-sm font-medium text-text-muted">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          aria-required="true"
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
          value={fields.name}
          onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
          className="input-dark"
          placeholder="Your name"
        />
        {errors.name && (
          <span id="cf-name-error" role="alert" className="text-red-400 text-xs mt-0.5">
            {errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cf-email" className="text-sm font-medium text-text-muted">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          aria-required="true"
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
          value={fields.email}
          onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
          className="input-dark"
          placeholder="you@example.com"
        />
        {errors.email && (
          <span id="cf-email-error" role="alert" className="text-red-400 text-xs mt-0.5">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cf-phone" className="text-sm font-medium text-text-muted">
          Phone <span className="text-text-muted/60 font-normal">(optional)</span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          value={fields.phone}
          onChange={(e) => setFields((f) => ({ ...f, phone: e.target.value }))}
          className="input-dark"
          placeholder="+27 82 123 4567"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cf-message" className="text-sm font-medium text-text-muted">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          aria-required="true"
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          rows={5}
          value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
          className="input-dark resize-none"
          placeholder="Tell us about your project…"
        />
        {errors.message && (
          <span id="cf-message-error" role="alert" className="text-red-400 text-xs mt-0.5">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="self-start bg-accent text-background rounded-full px-6 py-2.5 font-medium hover:bg-accent-hover transition-colors duration-200 disabled:opacity-60"
      >
        {submitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
