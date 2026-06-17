"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency, availableCurrencies } from "@/context/CurrencyContext";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-obsidian-300 transition-colors hover:border-accent/30 hover:text-white"
      >
        <span>{currency.symbol}</span>
        <span>{currency.code}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 max-h-60 w-44 overflow-y-auto rounded-xl border border-white/10 bg-obsidian-900 p-1 shadow-xl shadow-black/30 backdrop-blur-xl">
          {availableCurrencies.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                currency.code === c.code
                  ? "bg-accent/10 text-accent-light"
                  : "text-obsidian-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="w-6 text-center font-medium">{c.symbol}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-obsidian-500">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
