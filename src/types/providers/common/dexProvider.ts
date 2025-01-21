import { QuoteRequest } from "../../quote/request";
import { ProviderQuoteResponse, QuoteResponse } from "../../quote/response";

export interface IDexProvider {
  getQuoteRate(args: QuoteRequest): Promise<ProviderQuoteResponse | undefined>;
  getTransactionData({
    sender,
    quoteRes,
  }: {
    sender: string;
    quoteRes: ProviderQuoteResponse;
  }): Promise<QuoteResponse | undefined>;
}
