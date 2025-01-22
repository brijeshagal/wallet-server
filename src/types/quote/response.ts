import { Providers } from "../../enums/providers/swap";
import { TokenRes, TokenResData } from "../token/quote";

export type ProviderQuoteData = {
  from: TokenResData;
  to: TokenResData;
  pathId: string;
  provider: Providers;
  sender: string;
  recipient: string;
};

export type ProviderQuoteResponse = {
  modifiedQuote: ProviderQuoteData;
  rawQuote: unknown;
};

export type QuoteResponse = {
  toAddress: string;
  from: TokenRes;
  to: TokenRes;
  data: string;
  provider: Providers;
};
