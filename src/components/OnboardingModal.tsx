"use client";

import { useState, useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";

const COUNTRIES = [
  { name: "United States", currency: "USD" },
  { name: "South Africa", currency: "ZAR" },
  { name: "Nigeria", currency: "NGN" },
  { name: "United Kingdom", currency: "GBP" },
  { name: "Germany", currency: "EUR" },
  { name: "France", currency: "EUR" },
  { name: "Kenya", currency: "KES" },
  { name: "Ghana", currency: "GHS" },
  { name: "Morocco", currency: "MAD" },
  { name: "Egypt", currency: "EGP" },
  { name: "India", currency: "INR" },
  { name: "China", currency: "CNY" },
  { name: "Japan", currency: "JPY" },
  { name: "Australia", currency: "AUD" },
  { name: "Canada", currency: "CAD" },
  { name: "Brazil", currency: "BRL" },
  { name: "Senegal", currency: "XOF" },
  { name: "Côte d'Ivoire", currency: "XOF" },
  { name: "Netherlands", currency: "EUR" },
  { name: "Italy", currency: "EUR" },
  { name: "Spain", currency: "EUR" },
  { name: "South Korea", currency: "KRW" },
  { name: "Mexico", currency: "MXN" },
  { name: "Argentina", currency: "ARS" },
  { name: "Chile", currency: "CLP" },
  { name: "Colombia", currency: "COP" },
  { name: "United Arab Emirates", currency: "AED" },
  { name: "Saudi Arabia", currency: "SAR" },
  { name: "Other", currency: "USD" },
];

export function OnboardingModal() {
  const { showOnboarding, completeOnboarding, dismissOnboarding } = useOnboarding();
  const { setCurrency } = useCurrency();
  const [name, setName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showOnboarding) {
      const timer = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(timer);
    }
  }, [showOnboarding]);

  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName);
    const country = COUNTRIES.find((c) => c.name === countryName);
    if (country) setCurrency(country.currency);
  };

  const handleSubmit = () => {
    const country = COUNTRIES.find((c) => c.name === selectedCountry);
    completeOnboarding({
      name: name.trim() || "Shopper",
      country: selectedCountry,
      currency: country?.currency || "USD",
    });
  };

  const handleSkip = () => {
    setCurrency("USD");
    dismissOnboarding();
  };

  if (!showOnboarding) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-obsidian-950/80 p-4 backdrop-blur-sm transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-md transform rounded-2xl border border-white/10 bg-obsidian-900 p-8 shadow-2xl transition-all duration-500 ${
          visible ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20">
            <Sparkles className="h-7 w-7 text-accent-light" />
          </div>
        </div>

        <h2 className="mb-2 text-center font-display text-2xl text-white">
          Welcome to {BRAND.storeName}
        </h2>
        <p className="mb-8 text-center text-sm text-obsidian-400">
          Tell us a bit about yourself so we can show prices in your currency.
        </p>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-obsidian-300">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-obsidian-300">
              Your Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/50"
            >
              <option value="" disabled className="bg-obsidian-900">
                Select your country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name} className="bg-obsidian-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSkip}
              className="btn-secondary flex-1 py-3 text-sm"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedCountry}
              className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
            >
              Get Started
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-obsidian-600">
          You can change your currency anytime from the header.
        </p>
      </div>
    </div>
  );
}
