import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import twitterAgentRouter from "./router/agent/twitter";
import quotesRouter from "./router/quote";
import actionsRouter from "./router/request";
import userDatabaseRouter from "./router/user";

const app = express();
dotenv.config();
const MONGO_URI = process.env.MONGO_URL || "";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.use(helmet());
app.use(express.json());

app.use("/swap", quotesRouter);
app.use("/actions", actionsRouter);
app.use("/user", userDatabaseRouter);
app.use("/agent/twitter", twitterAgentRouter);
app.get("/auth/callback", async (req, res) => {
  const { state, code } = req.query as { state: string; code: string };
  res.redirect(
    `${process.env.EXPO_APP_LINK}/auth/twitter/profile?state=${state}&code=${code}`
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
