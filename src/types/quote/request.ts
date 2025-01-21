import { InputSrc } from "../../enums/token";
import { CompleteFormToken } from "../token/quote";

export type QuoteRequest = {
  from: CompleteFormToken;
  to: CompleteFormToken;
  sender: string;
  recipient: string;
  slippage: number;
  amount: string;
  inputSrc: InputSrc;
};
