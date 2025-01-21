import { Networks } from "../../../enums/network/ecosystem";

export type ProviderSupportDetails = {
  from: Set<Networks>;
  to: Set<Networks>;
};
