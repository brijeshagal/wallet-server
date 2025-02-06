import { isAddress } from "viem";
import { Networks } from "../../enums/network/ecosystem";

export const getNetworkFromAddress = (address: string) => {
  if (isAddress(address)) {
    return Networks.EVM;
  }
  return null;
};
