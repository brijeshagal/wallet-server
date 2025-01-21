import { Providers } from "../../enums/providers/swap";
import { TokenRes, TokenResData } from "../token/quote";

export type ProviderQuoteResponse = {
  from: TokenResData;
  to: TokenResData;
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
