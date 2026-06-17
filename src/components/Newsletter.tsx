"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding">
        <div className="glass-card mx-auto max-w-2xl p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
            <Check className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="mb-2 font-display text-2xl text-white">
            You&apos;re in!
          </h3>
          <p className="text-obsidian-400">
            Thanks for subscribing. We&apos;ll send you curated picks, early
            access, and exclusive offers.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding mx-auto max-w-7xl">
      <div className="glass-card relative overflow-hidden p-8 sm:p-12 lg:p-16">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
            Stay Connected
          </p>
          <h2 className="mb-4 font-display text-3xl text-white sm:text-4xl">
            Get curated picks delivered to your inbox
          </h2>
          <p className="mb-8 text-obsidian-300">
            Join our newsletter for product drops, style inspiration, and
            exclusive subscriber-only offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white placeholder-obsidian-500 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
            <button type="submit" className="btn-primary shrink-0 group">
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <p className="mt-4 text-xs text-obsidian-500">
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
