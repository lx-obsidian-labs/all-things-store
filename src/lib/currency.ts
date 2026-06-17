export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
  locale: string;
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1, locale: "en-US" },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 18.42, locale: "en-ZA" },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.93, locale: "de-DE" },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79, locale: "en-GB" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 1580.00, locale: "en-NG" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", rate: 129.50, locale: "sw-KE" },
  { code: "GHS", symbol: "GH₵", name: "Ghanaian Cedi", rate: 15.20, locale: "en-GH" },
  { code: "XOF", symbol: "CFA", name: "West African CFA", rate: 610.00, locale: "fr-SN" },
  { code: "MAD", symbol: "MAD", name: "Moroccan Dirham", rate: 10.05, locale: "ar-MA" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound", rate: 48.50, locale: "ar-EG" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.50, locale: "en-IN" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.25, locale: "zh-CN" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 157.00, locale: "ja-JP" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.52, locale: "en-AU" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.37, locale: "en-CA" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 5.45, locale: "pt-BR" },
];

export const defaultCurrency = currencies[0];

export function convertPrice(amountUSD: number, rate: number): number {
  return Math.round((amountUSD * rate) * 100) / 100;
}

export function formatCurrency(amount: number, currency: Currency): string {
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: currency.rate >= 100 ? 0 : 2,
      maximumFractionDigits: currency.rate >= 100 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
}

export function getCurrencyByCode(code: string): Currency {
  return currencies.find((c) => c.code === code) ?? defaultCurrency;
}
