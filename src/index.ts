import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import quotesRouter from "./router/quote";
import actionsRouter from "./router/request";
import twitterAgentRouter from "./router/agent/twitter";
import userDatabaseRouter from "./router/user";

const app = express();
dotenv.config();

app.use(helmet());
app.use(express.json());

app.use("/swap", quotesRouter);
app.use("/actions", actionsRouter);
app.use("/user", userDatabaseRouter);
app.use("/agent/twitter", twitterAgentRouter);
app.get("/auth/callback", async (req, res) => {
  const { state, code } = req.query as { state: string; code: string };
  res.redirect(`${process.env.EXPO_APP_LINK}?state=${state}&code=${code}`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
