"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-padding mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Get in Touch
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-obsidian-300">
          Have a question, suggestion, or just want to say hello? We&apos;d love
          to hear from you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="glass-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Mail className="h-5 w-5 text-accent-light" />
            </div>
            <h3 className="mb-1 font-semibold text-white">Email</h3>
            <p className="text-sm text-obsidian-400">{BRAND.email}</p>
            <p className="text-xs text-obsidian-500">We reply within 24 hours</p>
          </div>

          <div className="glass-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Phone className="h-5 w-5 text-accent-light" />
            </div>
            <h3 className="mb-1 font-semibold text-white">WhatsApp</h3>
            <a
              href="https://wa.me/27694829711"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-light transition-colors hover:text-white"
            >
              +27 69 482 9711
            </a>
            <p className="text-xs text-obsidian-500">Quick replies via WhatsApp</p>
          </div>

          <div className="glass-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <MapPin className="h-5 w-5 text-accent-light" />
            </div>
            <h3 className="mb-1 font-semibold text-white">Location</h3>
            <p className="text-sm text-obsidian-400">
              {BRAND.company}
              <br />
              123 Obsidian Lane, Suite 200
              <br />
              San Francisco, CA 94102
            </p>
          </div>
        </div>

        <div className="glass-card p-8 lg:col-span-3">
          {submitted ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <Send className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="mb-2 font-display text-2xl text-white">
                Message Sent!
              </h3>
              <p className="max-w-sm text-obsidian-400">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-obsidian-300"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-obsidian-300"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-obsidian-300"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                >
                  <option value="" className="bg-obsidian-900">
                    Select a subject
                  </option>
                  <option value="order" className="bg-obsidian-900">
                    Order Inquiry
                  </option>
                  <option value="product" className="bg-obsidian-900">
                    Product Question
                  </option>
                  <option value="shipping" className="bg-obsidian-900">
                    Shipping & Returns
                  </option>
                  <option value="wholesale" className="bg-obsidian-900">
                    Wholesale / Partnership
                  </option>
                  <option value="other" className="bg-obsidian-900">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-obsidian-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
