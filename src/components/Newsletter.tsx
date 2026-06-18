"use client";

import { ArrowRight, Check, Mail, User, Sparkles } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name.trim() || undefined }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding">
        <div className="glass-card mx-auto max-w-2xl p-8 text-center sm:p-12 animate-fade-in">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 shadow-lg shadow-emerald-500/10">
            <Sparkles className="h-7 w-7 text-emerald-400" />
          </div>
          <h3 className="mb-2 font-display text-2xl text-white">
            You&apos;re in{name ? `, ${name.split(" ")[0]}` : ""}!
          </h3>
          <p className="text-obsidian-400">
            Welcome to the All Things community. We&apos;ll send you curated picks,
            early access to drops, and exclusive offers.
          </p>
          <p className="mt-4 text-xs text-obsidian-500">
            Check your inbox for a welcome email &mdash; and don&apos;t forget to use
            code <span className="font-mono text-accent-light">WELCOME10</span> for 10% off.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding mx-auto max-w-7xl">
      <div className="glass-card relative overflow-hidden p-8 sm:p-12 lg:p-16">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light">
            <Mail className="h-3.5 w-3.5" />
            Subscriber-only perks
          </div>
          <h2 className="mb-4 font-display text-3xl text-white sm:text-4xl">
            Get curated picks delivered to your inbox
          </h2>
          <p className="mb-8 text-obsidian-300">
            Join <span className="text-white font-medium">5,000+</span> subscribers for product drops,
            exclusive discounts, and style inspiration — no spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-3">
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name (optional)"
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-6 text-sm text-white placeholder-obsidian-500 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-6 text-sm text-white placeholder-obsidian-500 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            {error && (
              <p className="animate-slide-up text-xs text-red-400">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting || !email}
              className="btn-primary w-full group disabled:opacity-50"
            >
              {submitting ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-obsidian-500">
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-400" />
              No spam
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-400" />
              Unsubscribe anytime
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-400" />
              10% off on signup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
