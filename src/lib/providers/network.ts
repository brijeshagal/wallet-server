import { DexSupportDetails } from "../../constants/dexes/support";
import { Providers } from "../../enums/providers/swap";
import { CompleteFormToken } from "../../types/token/quote";

export const getSupportedProviders = ({
  from,
  to,
}: {
  from: CompleteFormToken;
  to: CompleteFormToken;
}) => {
  const providers: Providers[] = [];

  Object.entries(DexSupportDetails).forEach(([provider, details]) => {
    if (
      details.from.has(from.assets.network) &&
      details.to.has(to.assets.network)
    ) {
      providers.push(provider as Providers);
    }
  });
  return providers;
};
