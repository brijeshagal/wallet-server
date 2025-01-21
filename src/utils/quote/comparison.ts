import { InputSrc } from "../../enums/token";
import { ProviderQuoteResponse } from "../../types/quote/response";

export function getBestQuote(
  successQuotes: ProviderQuoteResponse[],
  inputSrc: InputSrc
): ProviderQuoteResponse | undefined {
  console.log({ successQuotes });
  return successQuotes.reduce((best, current) => {
    const bestAmount = best.from // @dev checks if best is empty or not
      ? inputSrc === InputSrc.From
        ? BigInt(best.from.amount)
        : BigInt(best.to.amount)
      : 0n;
    const currentAmount =
      inputSrc === InputSrc.From
        ? BigInt(current.from.amount)
        : BigInt(current.to.amount);

    return currentAmount > bestAmount ? current : best;
  }, {} as ProviderQuoteResponse);
}
