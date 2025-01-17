import { Providers } from "../../../enums/providers/swap";
import {
  OdosBuildResponse,
  OdosQuoteResponse,
  OdosTokenResponse,
} from "../../../types/providers/odos/swap/quote";
import { ProviderQuoteResponse } from "../../../types/quote/response";
import { TokenResData } from "../../../types/token/quote";
import { joinStrings } from "../../common/string";
import { getTokenAddress } from "../../token/address";

const modifyTokenFormat = (chainId: number, tokens: OdosTokenResponse[]) => {
  return tokens.reduce((acc, token) => {
    const tokenAddress = getTokenAddress(token.tokenAddress);
    const tokenKey = joinStrings(chainId, tokenAddress);
    return {
      ...acc,
      [tokenKey]: {
        address: tokenAddress,
        amount: token.amount,
      },
    };
  }, {} as Record<string, TokenResData>);
};

export const modifyOdosBuildToQuoteResponse = (
  quoteRes: ProviderQuoteResponse,
  buildRes: OdosBuildResponse
) => {
  const chainId = buildRes.transaction.chainId;
  return {
    toAddress: buildRes.transaction.to,
    chainId: buildRes.transaction.chainId,
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
    provider: Providers.Odos, // Assigning 'ODOS' as the provider name
  };
};
