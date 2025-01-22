import { Request, Response } from "express";
import { DexFactory } from "../dex/DexFactory";
import { QuoteRequest } from "../types/quote/request";

export default class Controller {
  private dexFactory: DexFactory;
  constructor() {
    this.dexFactory = new DexFactory();
    this.getBestQuote = this.getBestQuote.bind(this);
  }

  public getBestQuote = async (req: Request, res: Response) => {
    const quotesAndBuildRes = await this.dexFactory.getBestQuote(
      req.body as QuoteRequest
    );
    if (quotesAndBuildRes) {
      res.json(quotesAndBuildRes);
    } else {
      console.error("Error in Quote");
      res.status(400).json({ error: "Failed" });
    }
  };
}
