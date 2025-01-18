import { Token } from ".";

export type FormToken = { assets?: Token; amount: string };

export type CompleteFormToken = Required<FormToken>;

export type TokenRes = Record<string, TokenResData>;

export type TokenResData = {
  chainId: number;
  address: string;
  amount: string;
};
