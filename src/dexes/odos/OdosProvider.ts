import axios from "axios";
import { checksumAddress } from "viem";
import { HexString } from "../../types/address/evm";
import { IDexProvider } from "../../types/providers/common/dexProvider";
import { QuoteRequest } from "../../types/quote/request";
import { ProviderQuoteResponse } from "../../types/quote/response";
import { OdosQuoteResponse } from "./types/quote";
import {
  modifyOdosQuoteResponse,
  transformOdosBuildResponse,
} from "./utils/formatter/quote";

export default class OdosProvider implements IDexProvider {
  quoteUrl = "https://api.odos.xyz/sor/quote/v2";
  assembleUrl = "https://api.odos.xyz/sor/assemble";

  async getQuoteRate(quoteReq: QuoteRequest) {
    try {
      const { from, recipient, slippage, to, sender, inputSrc } = quoteReq;
      const amount = quoteReq[inputSrc].amount;
      const quoteRequestBody = {
        chainId: from.assets.chainId,
        inputTokens: [
          {
            tokenAddress: checksumAddress(from.assets.address as HexString),
            amount,
          },
        ],
        outputTokens: [
          {
            tokenAddress: checksumAddress(to.assets.address as HexString),
            proportion: 1,
          },
        ],
        userAddr: checksumAddress(sender as HexString),
        slippageLimitPercent: slippage,
        referralCode: 0,
        disableRFQs: true,
        compact: true,
      };

      const quoteResponse = await axios.post(this.quoteUrl, quoteRequestBody, {
        headers: { "Content-Type": "application/json" },
      });

      if (quoteResponse.status === 200) {
        const quoteRes = quoteResponse.data as OdosQuoteResponse;
        const modifiedQuote = modifyOdosQuoteResponse(quoteRes, quoteReq);
        return { modifiedQuote, rawQuote: quoteRes };
      } else {
        console.error("Error in Quote:", quoteResponse.statusText);
        return;
      }
    } catch (e) {
      console.error({ e });
      return;
    }
  }
  async getTransactionData({
    quoteRes,
  }: {
    quoteRes: ProviderQuoteResponse;
  }) {
    try {
      const { modifiedQuote } = quoteRes;
      const assembleRequestBody = {
        userAddr: checksumAddress(modifiedQuote.sender as HexString),
        pathId: modifiedQuote.pathId, // Replace with the pathId from quote response in step 1
        simulate: false, // this can be set to true if the user isn't doing their own estimate gas call for the transaction
      };
      const assembledResponse = await axios.post(
        this.assembleUrl,
        assembleRequestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const assembledTransaction = assembledResponse.data;
      const buildData = transformOdosBuildResponse(
        quoteRes.modifiedQuote,
        assembledTransaction
      );
      return buildData;
    } catch (e) {
      console.log({ e });
      return;
    }
  }
}
