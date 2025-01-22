import {
  eFormatNativeCurrencyLowerCase,
  nativeCurrency,
} from "../../constants/address/native";

export const getTokenAddress = (address: string) => {
  if (address.toLowerCase() === eFormatNativeCurrencyLowerCase) {
    return nativeCurrency;
  }
  return address;
};
