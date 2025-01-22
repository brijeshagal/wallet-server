import { InputSrc } from "../../enums/token";
import { ProviderQuoteResponse } from "../../types/quote/response";

export function getBestQuote(
  successQuotes: ProviderQuoteResponse[],
  inputSrc: InputSrc
): ProviderQuoteResponse | undefined {
  return successQuotes.reduce((best, current) => {
    const bestAmount = best.modifiedQuote // @dev checks if best is empty or not
      ? inputSrc === InputSrc.From
        ? BigInt(best.modifiedQuote.from.amount)
        : BigInt(best.modifiedQuote.to.amount)
      : 0n;
    const currentAmount =
      inputSrc === InputSrc.From
        ? BigInt(current.modifiedQuote.from.amount)
        : BigInt(current.modifiedQuote.to.amount);

    return currentAmount > bestAmount ? current : best;
  }, {} as ProviderQuoteResponse);
}
