import { Router } from "express";

const twitterAgentRouter = Router();

twitterAgentRouter.post("/register-tweet");
twitterAgentRouter.post("/notify-user");

export default twitterAgentRouter;
