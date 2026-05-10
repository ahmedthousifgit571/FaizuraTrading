export type CurrencyCode =
  | "USD" | "SGD" | "EUR" | "GBP" | "AUD" | "JPY"
  | "INR" | "MYR" | "HKD" | "CNY" | "CAD";

export type Currency = {
  code: CurrencyCode;
  name: string;
  flag: string; // emoji
  symbol: string;
};

export type ExchangeRate = {
  base: CurrencyCode;
  quote: CurrencyCode;
  buy: number;
  sell: number;
  change24h: number;
  spark?: number[];
};

export type Branch = {
  name: string;
  address: string;
  hours: string;
  phone: string;
  mapsUrl: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: number;
  date: string;
};
