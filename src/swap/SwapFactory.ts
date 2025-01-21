import { dexes } from "../constants/dexes/support";
import { Providers } from "../enums/providers/swap";
import { InputSrc } from "../enums/token";
import { getSupportedProviders } from "../lib/providers/network";
import { IDexProvider } from "../types/providers/common/dexProvider";
import { QuoteRequest } from "../types/quote/request";
import { ProviderQuoteResponse } from "../types/quote/response";

export class DexFactory {
  private providers: {
    [key: string]: IDexProvider;
  } = {};
  constructor() {
    this.providers = dexes;
    this.getQuotes = this.getQuotes.bind(this);
  }

  async getQuotes(quoteRequest: QuoteRequest) {
    const { from, to } = quoteRequest;
    const supportedProviders = getSupportedProviders({ from, to });

    const promises = async (dex: Providers) => {
      return await this.providers[dex].getQuoteRate(quoteRequest);
    };

    const quotesResponses = await Promise.allSettled(
      supportedProviders.map(promises)
    );
    const successQuotes = quotesResponses
      .filter((res) => res.status === "fulfilled")
      .map((res) => res.value);
  }

  getBestQuote(
    successQuotes: ProviderQuoteResponse[],
    inputSrc: InputSrc
  ): ProviderQuoteResponse | undefined {
    return successQuotes.reduce((best, current) => {
      const bestAmount =
        inputSrc === InputSrc.From
          ? BigInt(best.from.amount)
          : BigInt(best.to.amount);
      const currentAmount =
        inputSrc === InputSrc.From
          ? BigInt(current.from.amount)
          : BigInt(current.to.amount);

      return currentAmount > bestAmount ? current : best;
    }, {} as ProviderQuoteResponse);
  }
}
