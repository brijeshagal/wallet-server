import { dexes } from "../constants/dexes/support";
import { Providers } from "../enums/providers/swap";
import { getSupportedProviders } from "../lib/providers/network";
import { IDexProvider } from "../types/providers/common/dexProvider";
import { QuoteRequest } from "../types/quote/request";
import { ProviderQuoteResponse } from "../types/quote/response";
import { getBestQuote } from "../utils/quote/comparison";

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
      const successQuotes = quotesResponses.reduce<ProviderQuoteResponse[]>(
        (acc, res) => {
          if (res.status === "fulfilled" && res.value !== undefined) {
            acc.push(res.value);
          }
          return acc;
        },
        []
      );

      const bestQuote = getBestQuote(successQuotes, inputSrc);
      if (bestQuote) {
        return await this.providers[
          bestQuote.modifiedQuote.provider
        ].getTransactionData({
          quoteRes: bestQuote,
        });
      }
    } catch (e) {
      console.error("Error fetching quote:", e);
    }
  }
}
