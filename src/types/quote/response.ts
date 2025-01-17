import { Providers } from "../../enums/providers/swap";

export type ProviderQuoteResponse = {
  from: string[];
  to: string[];
  inAmounts: string[];
  outAmounts: string[];
  pathId: string;
  provider: Providers;
};

export type QuoteResponse = {
  toAddress: string;
  from: string;
  netOutputValue: number;
  data: string;
  provider: Providers;
};
