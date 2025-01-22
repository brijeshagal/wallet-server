import { Providers } from "../../../../enums/providers/swap";
import {
  OdosBuildResponse,
  OdosQuoteResponse,
  OdosTokenResponse,
} from "../../types/quote";
import { QuoteRequest } from "../../../../types/quote/request";
import {
  ProviderQuoteData,
  ProviderQuoteResponse,
  QuoteResponse,
} from "../../../../types/quote/response";
import { TokenRes } from "../../../../types/token/quote";
import { joinStrings } from "../../../../utils/common/string";
import { getTokenAddress } from "../../../../utils/token/address";
import { transformTokenResDataToTokenRes } from "../../../../utils/quote/formatter";

export const modifyOdosQuoteResponse = (
  quoteRes: OdosQuoteResponse,
  quoteReq: QuoteRequest
): ProviderQuoteData => {
  return {
    from: {
      address: getTokenAddress(quoteRes.inTokens[0]),
      amount: quoteRes.inAmounts[0],
      chainId: quoteReq.from.assets.chainId,
    },
    to: {
      address: getTokenAddress(quoteRes.outTokens[0]),
      amount: quoteRes.outAmounts[0],
      chainId: quoteReq.to.assets.chainId,
    },
    pathId: quoteRes.pathId,
    provider: Providers.Odos,
    sender: quoteReq.sender,
    recipient: quoteReq.recipient,
  };
};

export const transformOdosBuildResponse = (
  modifiedQuote: ProviderQuoteData,
  buildRes: OdosBuildResponse
): QuoteResponse => {
  return {
    toAddress: buildRes.transaction.to,
    data: buildRes.transaction.data,
    from: transformTokenResDataToTokenRes([modifiedQuote.from]),
    to: transformTokenResDataToTokenRes([modifiedQuote.to]),
    provider: Providers.Odos,
  };
};
