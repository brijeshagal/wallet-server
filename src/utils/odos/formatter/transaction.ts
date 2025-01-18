import { Providers } from "../../../enums/providers/swap";
import {
  OdosBuildResponse,
  OdosQuoteResponse,
  OdosTokenResponse,
} from "../../../types/providers/odos/swap/quote";
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
  quoteRes: OdosQuoteResponse
): ProviderQuoteResponse => {
  return {
    from: quoteRes.inTokens,
    to: quoteRes.outTokens,
    inAmounts: quoteRes.inAmounts,
    outAmounts: quoteRes.outAmounts,
    pathId: quoteRes.pathId,
    provider: Providers.Odos,
  };
};
