"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types";

const CURRENCIES: Array<{ code: CurrencyCode; flag: string; name: string }> = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "SGD", flag: "🇸🇬", name: "Singapore Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen" },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee" },
  { code: "MYR", flag: "🇲🇾", name: "Malaysian Ringgit" },
  { code: "HKD", flag: "🇭🇰", name: "Hong Kong Dollar" },
  { code: "CNY", flag: "🇨🇳", name: "Chinese Yuan" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
];

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onAmountChange: (v: string) => void;
  label: string;
};

const CurrencyInput = forwardRef<HTMLInputElement, Props>(function CurrencyInput(
  { currency, onCurrencyChange, onAmountChange, label, value, className, ...props },
  ref
) {
  return (
    <label className={cn("flex flex-col gap-2 group", className)}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors duration-200 focus-within:border-primary/40">
        <select
          aria-label={`${label} currency`}
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
          className="bg-transparent text-primary text-sm font-medium pr-2 border-r border-border focus:outline-none cursor-pointer"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code} className="bg-surface">
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        <input
          ref={ref}
          inputMode="decimal"
          value={value}
          onChange={(e) => onAmountChange(e.target.value)}
          className="flex-1 bg-transparent text-2xl tabular text-primary placeholder:text-muted focus:outline-none"
          {...props}
        />
      </div>
    </label>
  );
});

export default CurrencyInput;
export { CURRENCIES };
