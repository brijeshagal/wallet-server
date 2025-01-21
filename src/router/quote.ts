import { Router } from "express";
import Controller from "../controller/Controller";

const quotesRouter = Router();
const controller = new Controller();

quotesRouter.post("/quote", controller.getBestQuote);

export default quotesRouter;
