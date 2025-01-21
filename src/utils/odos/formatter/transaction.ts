import { Providers } from "../../../enums/providers/swap";
import {
  OdosBuildResponse,
  OdosQuoteResponse,
  OdosTokenResponse,
} from "../../../types/providers/odos/swap/quote";
import { QuoteRequest } from "../../../types/quote/request";
import {
  ProviderQuoteResponse,
  QuoteResponse,
} from "../../../types/quote/response";
import { TokenRes } from "../../../types/token/quote";
import { joinStrings } from "../../common/string";
import { getTokenAddress } from "../../token/address";

const modifyTokenFormat = (chainId: number, tokens: OdosTokenResponse[]) => {
  return tokens.reduce((acc, token) => {
    const tokenAddress = getTokenAddress(token.tokenAddress);
    const tokenKey = joinStrings(chainId, tokenAddress);
    return {
      ...acc,
      [tokenKey]: {
        chainId,
        address: tokenAddress,
        amount: token.amount,
      },
    };
  }, {} as TokenRes);
};

export const modifyOdosBuildToQuoteResponse = (
  quoteRes: ProviderQuoteResponse,
  buildRes: OdosBuildResponse
): QuoteResponse => {
  const chainId = buildRes.transaction.chainId;
  return {
    toAddress: buildRes.transaction.to,
    data: buildRes.transaction.data,
    from: modifyTokenFormat(chainId, buildRes.inputTokens),
    to: modifyTokenFormat(chainId, buildRes.outputTokens),
    provider: Providers.Odos,
  };
};

export const modifyOdosQuoteResponse = (
  quoteRes: OdosQuoteResponse,
  quoteReq: QuoteRequest
): ProviderQuoteResponse => {
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
  };
};
