import { QuoteRequest } from "../../quote/request";
import { QuoteResponse } from "../../quote/response";

export interface IDexProvider {
  getQuoteRate(args: QuoteRequest): Promise<QuoteResponse | undefined>;
}
