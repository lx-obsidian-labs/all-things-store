"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Currency } from "@/lib/currency";
import { currencies, defaultCurrency, convertPrice, formatCurrency } from "@/lib/currency";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (code: string) => void;
  format: (amountUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: defaultCurrency,
  setCurrency: () => {},
  format: (n) => `$${n.toFixed(2)}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrency);

  const setCurrency = useCallback((code: string) => {
    const found = currencies.find((c) => c.code === code);
    if (found) setCurrencyState(found);
  }, []);

  const format = useCallback(
    (amountUSD: number) => {
      const converted = convertPrice(amountUSD, currency.rate);
      return formatCurrency(converted, currency);
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export const availableCurrencies = currencies;
