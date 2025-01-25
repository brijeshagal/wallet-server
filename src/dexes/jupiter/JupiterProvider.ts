import { PublicKey } from "@solana/web3.js";
import { IDexProvider } from "../../types/providers/common/dexProvider";
import { QuoteRequest } from "../../types/quote/request";
import { ProviderQuoteResponse } from "../../types/quote/response";
import {
  modifyJupiterQuoteResponse,
  transformJupiterBuildResponse,
} from "./utils/formatter/quote";

export default class LifiProvider implements IDexProvider {
  quoteUrl = "https://quote-api.jup.ag/v6/quote";
  buildUrl = "https://quote-api.jup.ag/v6/swap";

  async getQuoteRate(quoteReq: QuoteRequest) {
    try {
      const { from, slippage, to, inputSrc } = quoteReq;
      const amount = quoteReq[inputSrc].amount;
      const quoteResponse = await (
        await fetch(
          `${this.quoteUrl}?inputMint=${from.assets.address}&outputMint=${to.assets.address}&amount=${amount}&slippageBps=${slippage}`
        )
      ).json();
      const modifiedQuote = modifyJupiterQuoteResponse(quoteResponse, quoteReq);
      return { modifiedQuote, rawQuote: quoteResponse };
    } catch (e) {
      console.error({ e });
      return;
    }
  }
  async getTransactionData({ quoteRes }: { quoteRes: ProviderQuoteResponse }) {
    try {
      const { modifiedQuote, rawQuote } = quoteRes;
      const publicKey = new PublicKey(quoteRes.modifiedQuote.sender);
      const transactionData = await (
        await fetch(this.buildUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // quoteResponse from /quote api
            quoteResponse: rawQuote,
            // user public key to be used for the swap
            userPublicKey: publicKey.toString(),
            // auto wrap and unwrap SOL. default is true
            wrapAndUnwrapSol: true,
            // Optional, use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
          }),
        })
      ).json();

      const buildData = transformJupiterBuildResponse(
        transactionData,
        modifiedQuote
      );
      return buildData;
    } catch (e) {
      console.log({ e });
      return;
    }
  }
}
