export type Token = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
};

export type FeeCost = {
  included: boolean;
  amount: string;
  amountUSD: string;
  description: string;
  name: string;
  percentage: string;
  token: Token;
};

export type GasCost = {
  token: Token;
  amount: string;
  amountUSD: string;
  estimate: string;
  limit: string;
  price: string;
  type: string;
};

export type Estimate = {
  tool: string;
  approvalAddress: string;
  toAmountMin: string;
  toAmount: string;
  fromAmount: string;
  feeCosts: FeeCost[];
  gasCosts: GasCost[];
  executionDuration: number;
  fromAmountUSD: string;
  toAmountUSD: string;
};

export type Action = {
  fromToken: Token;
  fromAmount: string;
  toToken: Token;
  fromChainId: number;
  toChainId: number;
  slippage: number;
  fromAddress: string;
  toAddress: string;
  destinationGasConsumption: string;
  destinationCallData: string;
};

export type ToolDetails = {
  key: string;
  name: string;
  logoURI: string;
};

export type Step = {
  id: string;
  type: string;
  action: Action;
  estimate: Estimate;
  tool: string;
  toolDetails: ToolDetails;
};

export type TransactionRequest = {
  data: string;
};

export type LifiQuoteResponse = {
  type: string;
  id: string;
  tool: string;
  toolDetails: ToolDetails;
  action: Action;
  estimate: Estimate;
  includedSteps: Step[];
  integrator: string;
  transactionRequest: TransactionRequest;
};
