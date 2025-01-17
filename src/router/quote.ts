import { Router } from "express";
import { getQuotes } from "../controller/swap/quote";

const quotesRouter = Router();

quotesRouter.post("/quote", getQuotes);

export default quotesRouter;
