import { InputSrc } from "../../enums/token";
import { ProviderQuoteResponse } from "../../types/quote/response";

export function getBestQuote(
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
