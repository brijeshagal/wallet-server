import { Router } from "express";
import ActionsController from "../controller/ActionsController";

const actionsRouter = Router();
const controller = new ActionsController();

actionsRouter.post("/request", controller.requestAction);

export default actionsRouter;
