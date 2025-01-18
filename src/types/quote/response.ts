import { Providers } from "../../enums/providers/swap";
import { TokenRes } from "../token/quote";

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
  from: TokenRes;
  to: TokenRes;
  // netOutputValue: number;
  data: string;
  provider: Providers;
};
