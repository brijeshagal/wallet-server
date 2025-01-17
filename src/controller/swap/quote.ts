import { RequestHandler } from "express";
import { QuoteRequest } from "../../types/quote/request";
import OdosProvider from "./odos/OdosProvider";

export const getQuotes: RequestHandler = async (req, res) => {
  try {
    const quoteRequest = req.body as QuoteRequest;
    const odosProvider = new OdosProvider();
    const quotes = await odosProvider.getQuoteRate(quoteRequest);
    if (quotes) {
      const quotesAndBuildRes = await odosProvider.getTransactionData({
        quoteRes: quotes,
        sender: quoteRequest.sender,
      });
      res.json(quotesAndBuildRes);
    } else {
      console.error("Error in Quote");
      res.status(400).json({ error: "Failed" });
    }
  } catch (e) {
    console.error("Error fetching quote:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
