import { JupiterSwapMode } from "../enums/mode";

export type JupiterQuoteResponse = {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: JupiterSwapMode;
  slippageBps: number;
  platformFee: number | null; // Can be either a number or null
  priceImpactPct: string;
  routePlan: any[]; // @dev TODO add more specifics
  scoreReport: any | null;
  contextSlot: number;
  timeTaken: number;
  swapUsdValue: string;
};

export type JupiterBuildResponse = {
  swapTransaction: string;
  lastValidBlockHeight: number;
  prioritizationFeeLamports: number;
  computeUnitLimit: number;
  prioritizationType: {
    computeBudget: {
      microLamports: number;
      estimatedMicroLamports: number;
    };
  };
  simulationSlot: number | null;
  dynamicSlippageReport: any | null;
  simulationError: any | null;
};
