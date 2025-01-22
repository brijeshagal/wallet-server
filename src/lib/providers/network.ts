import { DexSupportDetails } from "../../constants/dexes/support";
import { Providers } from "../../enums/providers/swap";
import { InputSrc } from "../../enums/token";
import { CompleteFormToken } from "../../types/token/quote";

export const getSupportedProviders = ({
  from,
  to,
  inputSrc,
}: {
  from: CompleteFormToken;
  to: CompleteFormToken;
  inputSrc: InputSrc;
}) => {
  const providers: Providers[] = [];

  Object.entries(DexSupportDetails).forEach(([provider, details]) => {
    if (
      details.from.has(from.assets.network) &&
      details.to.has(to.assets.network) &&
      (from.assets.chainId !== to.assets.chainId
        ? details.isCrossChainSupported
        : true) &&
      (inputSrc === InputSrc.To ? details.isOutputSrcSupported : true)
    ) {
      providers.push(provider as Providers);
    }
  });
  return providers;
};
