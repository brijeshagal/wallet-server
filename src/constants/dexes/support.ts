
import LifiProvider from "../../dexes/lifi/LifiProvider";
import { Networks } from "../../enums/network/ecosystem";
import { Providers } from "../../enums/providers/swap";
import { IDexProvider } from "../../types/providers/common/dexProvider";
import { ProviderSupportDetails } from "../../types/providers/common/support";

export const DexSupportDetails: Record<Providers, ProviderSupportDetails> = {
  [Providers.Lifi]: {
    from: new Set([Networks.EVM, Networks.SVM]),
    to: new Set([Networks.EVM, Networks.SVM]),
    isCrossChainSupported: true,
    isOutputSrcSupported: true,
  },
};

export const dexes: Record<Providers, IDexProvider> = {
  [Providers.Lifi]: new LifiProvider(),
};
