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
    const supportedProviders = getSupportedProviders({ from, to });
    try {
      const promises = async (dex: Providers) => {
        return await this.providers[dex].getQuoteRate(quoteRequest);
      };

      const quotesResponses = await Promise.allSettled(
        supportedProviders.map(promises)
      );
      const successQuotes = quotesResponses
        .filter((res) => res.status === "fulfilled")
        .map((res) => res.value);

      const bestQuote = getBestQuote(
        successQuotes as ProviderQuoteResponse[],
        inputSrc
      );
      if (bestQuote) {
        return await this.providers[bestQuote.provider].getTransactionData({
          quoteRes: bestQuote,
          sender: quoteRequest.sender,
        });
      }
    } catch (e) {
      console.error("Error fetching quote:", e);
    }
  }
}
