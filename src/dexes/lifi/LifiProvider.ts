import axios from "axios";
import { InputSrc } from "../../enums/token";
import { IDexProvider } from "../../types/providers/common/dexProvider";
import { QuoteRequest } from "../../types/quote/request";
import { ProviderQuoteResponse } from "../../types/quote/response";
import { LIFI_BPS_DIVIDER } from "./config";
import { LifiQuoteResponse } from "./types/quote";

export default class LifiProvider implements IDexProvider {
  quoteUrl = "https://li.quest/v1/quote";

  async getQuoteRate(quoteReq: QuoteRequest) {
    try {
      const { from, slippage, to, inputSrc, sender } = quoteReq;
      const params =
        inputSrc === InputSrc.From
          ? {
              fromChain: from.assets.chainId,
              toChain: to.assets.chainId,
              fromToken: from.assets.address,
              toToken: to.assets.address,
              fromAmount: from.amount,
              fromAddress: sender,
              slippage: slippage / LIFI_BPS_DIVIDER,
            }
          : {
              fromChain: from.assets.chainId,
              toChain: to.assets.chainId,
              fromToken: from.assets.address,
              toToken: to.assets.address,
              toAmount: to.amount,
              fromAddress: sender,
              slippage: slippage / LIFI_BPS_DIVIDER,
            };
      const _quoteUrl =
        inputSrc === InputSrc.From
          ? this.quoteUrl
          : `https://li.quest/v1/quote/toAmount`;
      const quoteResponse = await axios.get(_quoteUrl, {
        params,
      });
      const rawQuote = quoteResponse.data as LifiQuoteResponse;
      const modifiedQuote = modifyLifiQuoteResponse(rawQuote, quoteReq);
      return { modifiedQuote, rawQuote: rawQuote };
    } catch (e) {
      console.error({ e });
      return;
    }
  }
  async getTransactionData({ quoteRes }: { quoteRes: ProviderQuoteResponse }) {
    try {
      const { modifiedQuote, rawQuote } = quoteRes;
      const buildData = transformLifiBuildResponse(modifiedQuote, rawQuote);
      return buildData;
    } catch (e) {
      console.log({ e });
      return;
    }
  }
}
