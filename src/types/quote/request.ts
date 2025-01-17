import { TokenReqData } from "../token/quote";

export type QuoteRequest = {
  from: TokenReqData;
  to: TokenReqData;
  sender: string;
  recipient: string;
  slippage: number;
  amount: string;
};
