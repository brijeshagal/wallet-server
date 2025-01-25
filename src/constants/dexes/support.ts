import LifiProvider from "../../dexes/jupiter/JupiterProvider";
import JupiterProvider from "../../dexes/jupiter/JupiterProvider";
import OdosProvider from "../../dexes/odos/OdosProvider";
import { Networks } from "../../enums/network/ecosystem";
import { Providers } from "../../enums/providers/swap";
import { IDexProvider } from "../../types/providers/common/dexProvider";
import { ProviderSupportDetails } from "../../types/providers/common/support";

export const DexSupportDetails: Record<Providers, ProviderSupportDetails> = {
  [Providers.Odos]: {
    from: new Set([Networks.EVM]),
    to: new Set([Networks.EVM]),
    isCrossChainSupported: false,
    isOutputSrcSupported: false,
  },
  [Providers.Jupiter]: {
    from: new Set([Networks.SVM]),
    to: new Set([Networks.SVM]),
    isCrossChainSupported: false,
    isOutputSrcSupported: true,
  },
  [Providers.Lifi]: {
    from: new Set([Networks.EVM, Networks.SVM]),
    to: new Set([Networks.EVM, Networks.SVM]),
    isCrossChainSupported: true,
    isOutputSrcSupported: true,
  },
};

export const dexes: Record<Providers, IDexProvider> = {
  [Providers.Odos]: new OdosProvider(),
  [Providers.Jupiter]: new JupiterProvider(),
  [Providers.Lifi]: new LifiProvider(),
};
