import { dexes } from "../constants/dexes/support";
import { Providers } from "../enums/providers/swap";
import { getSupportedProviders } from "../lib/providers/network";
import { IDexProvider } from "../types/providers/common/dexProvider";
import { QuoteRequest } from "../types/quote/request";
import { QuoteResponse } from "../types/quote/response";

export class DexFactory {
  private providers: {
    [key: string]: IDexProvider;
  } = {};
  constructor() {
    this.providers = dexes;
    this.getBestQuote = this.getBestQuote.bind(this);
  }

  async getBestQuote(quoteRequest: QuoteRequest) {
    const { from, to, inputSrc } = quoteRequest;
    const supportedProviders = getSupportedProviders({ from, to, inputSrc });
    try {
      const promises = async (dex: Providers) => {
        return await this.providers[dex].getQuoteRate(quoteRequest);
      };

      const quotesResponses = await Promise.allSettled(
        supportedProviders.map(promises)
      );
      const successQuotes = quotesResponses.reduce<QuoteResponse[]>(
        (acc, res) => {
          if (res.status === "fulfilled" && res.value !== undefined) {
            acc.push(res.value);
          }
          return acc;
        },
        []
      );
      if (successQuotes.length) {
        return successQuotes[0];
      }
    } catch (e) {
      console.error("Error fetching quote:", e);
    }
  }
}
