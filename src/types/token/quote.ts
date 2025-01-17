import { Networks } from "../../enums/network/ecosystem";

export type TokenData = {
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  network: Networks;
  address: string;
  bal: string;
};
