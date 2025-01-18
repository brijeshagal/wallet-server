import axios from "axios";
import { checksumAddress } from "viem";
import { HexString } from "../../../types/address/evm";
import { OdosQuoteResponse } from "../../../types/providers/odos/swap/quote";
import { QuoteRequest } from "../../../types/quote/request";
import { ProviderQuoteResponse } from "../../../types/quote/response";
import {
  modifyOdosBuildToQuoteResponse,
  modifyOdosQuoteResponse,
} from "../../../utils/odos/formatter/transaction";

class OdosProvider {
  quoteUrl = "https://api.odos.xyz/sor/quote/v2";
  assembleUrl = "https://api.odos.xyz/sor/assemble";

  async getQuoteRate(args: QuoteRequest) {
    try {
      const { from, recipient, slippage, to, sender } = args;
      const quoteRequestBody = {
        chainId: from.assets.chainId,
        inputTokens: [
          {
            tokenAddress: checksumAddress(from.assets.address as HexString),
            amount: from.amount,
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
        const quote = quoteResponse.data as OdosQuoteResponse;
        const modifiedQuote = modifyOdosQuoteResponse(quote);
        return modifiedQuote;
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
    sender,
    quoteRes,
  }: {
    sender: string;
    quoteRes: ProviderQuoteResponse;
  }) {
    try {
      const assembleRequestBody = {
        userAddr: checksumAddress(sender as HexString),
        pathId: quoteRes.pathId, // Replace with the pathId from quote response in step 1
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
      const buildData = modifyOdosBuildToQuoteResponse(
        quoteRes,
        assembledTransaction
      );
      return buildData;
    } catch (e) {
      console.log({ e });
      return;
    }
  }
}

export default OdosProvider;
