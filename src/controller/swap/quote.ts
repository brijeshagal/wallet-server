import { RequestHandler } from "express";
import { checksumAddress } from "viem";
import { HexString } from "../../types/address/evm";
import { TokenData } from "../../types/token/quote";

export const getQuotes: RequestHandler = async (req, res) => {
  try {
    const { from, to, recipient, slippage, amount } = req.body as {
      from: TokenData;
      to: TokenData;
      recipient: string;
      slippage?: number;
      amount: string;
    };

    const quoteUrl = "https://api.odos.xyz/sor/quote/v2";
    const quoteRequestBody = {
      chainId: from.chainId,
      inputTokens: [
        {
          tokenAddress: checksumAddress(from.address as HexString),
          amount,
        },
      ],
      outputTokens: [
        {
          tokenAddress: checksumAddress(to.address as HexString),
          proportion: 1,
        },
      ],
      userAddr: checksumAddress(recipient as HexString),
      slippageLimitPercent: slippage || 0.3,
      referralCode: 0,
      disableRFQs: true,
      compact: true,
    };

    const response = await fetch(quoteUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quoteRequestBody),
    });

    if (response.ok) {
      const quote = await response.json();
      console.log({ quote });
      res.json({ message: "Quotes retrieved successfully", quote });
    } else {
      console.error("Error in Quote:", response.statusText);
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (e) {
    console.error("Error fetching quote:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
