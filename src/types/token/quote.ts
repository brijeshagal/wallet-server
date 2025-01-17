import { Networks } from "../../enums/network/ecosystem";

export type TokenReqData = {
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  network: Networks;
  address: string;
  bal: string;
};

export type TokenResData = {
  address: string;
  amount: string;
};
