import { TokenRes, TokenResData } from "../../types/token/quote";

export const transformTokenResDataToTokenRes = (
  tokens: TokenResData[]
): TokenRes => {
  return tokens.reduce((acc, token) => {
    const tokenKey = `${token.chainId}-${token.address}`; // Unique key based on chainId and address
    acc[tokenKey] = token;
    return acc;
  }, {} as TokenRes);
};
