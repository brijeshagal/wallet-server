import { Actions } from "../../enums/actions";
import { CompleteFormToken } from "../token/quote";

export type BuyActionNotification = {
  backRoute: string;
  screenRoute: string;
  // @dev here from and to will be same as
  // initially while selecting the are set as such
  // @TODO update to sending only token address
  //       and chainId
  fromToken: CompleteFormToken;
  toToken: CompleteFormToken;
  type: Actions;
  nftId: string;
};
