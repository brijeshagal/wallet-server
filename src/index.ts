import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import quotesRouter from "./router/quote";

const app = express();
dotenv.config();

app.use(helmet());
app.use(express.json());

app.use("/swap", quotesRouter); // Register user routes
app.use("/bridge", quotesRouter); // Register user routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));