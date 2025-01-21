import OdosProvider from "../../controller/swap/odos/OdosProvider";
import { Networks } from "../../enums/network/ecosystem";
import { Providers } from "../../enums/providers/swap";
import { IDexProvider } from "../../types/providers/common/dexProvider";
import { ProviderSupportDetails } from "../../types/providers/common/support";

export const DexSupportDetails: Record<Providers, ProviderSupportDetails> = {
  [Providers.Odos]: {
    from: new Set([Networks.EVM]),
    to: new Set([Networks.EVM]),
  },
  [Providers.Jupiter]: {
    from: new Set([Networks.SVM]),
    to: new Set([Networks.SVM]),
  },
};

export const dexes: Record<Providers, IDexProvider> = {
  [Providers.Odos]: new OdosProvider(),
  [Providers.Jupiter]: new OdosProvider(),
};
