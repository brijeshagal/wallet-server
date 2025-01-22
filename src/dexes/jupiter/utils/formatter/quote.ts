import { Providers } from "../../../../enums/providers/swap";
import { QuoteRequest } from "../../../../types/quote/request";
import {
  ProviderQuoteData,
  QuoteResponse,
} from "../../../../types/quote/response";
import { transformTokenResDataToTokenRes } from "../../../../utils/quote/formatter";
import { JupiterBuildResponse, JupiterQuoteResponse } from "../../types/quote";

export const modifyJupiterQuoteResponse = (
  quoteRes: JupiterQuoteResponse,
  quoteReq: QuoteRequest
): ProviderQuoteData => {
  const { inputMint, inAmount, outputMint, outAmount } = quoteRes;

  return {
    from: {
      chainId: quoteReq.from.assets.chainId,
      address: inputMint,
      amount: inAmount,
    },
    to: {
      chainId: quoteReq.to.assets.chainId,
      address: outputMint,
      amount: outAmount,
    },
    pathId: "",
    provider: Providers.Jupiter,
    sender: quoteReq.sender,
    recipient: quoteReq.recipient,
  };
};

export function transformJupiterBuildResponse(
  buildResponse: JupiterBuildResponse,
  modifiedQuote: ProviderQuoteData
): QuoteResponse {
  return {
    toAddress: "", // @TODO check what to do here
    from: transformTokenResDataToTokenRes([modifiedQuote.from]),
    to: transformTokenResDataToTokenRes([modifiedQuote.to]),
    data: buildResponse.swapTransaction, // Encoded swap transaction
    provider: Providers.Jupiter, // Hardcoded provider
  };
}
