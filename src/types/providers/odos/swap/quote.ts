export type OdosTokenResponse = {
  tokenAddress: string;
  amount: string;
};

export type OdosBuildResponse = {
  deprecated: null;
  blockNumber: number;
  gasEstimate: number;
  gasEstimateValue: number;
  inputTokens: OdosTokenResponse[];
  outputTokens: OdosTokenResponse[];
  netOutValue: number;
  outValues: string[];
  transaction: {
    gas: number;
    gasPrice: number;
    value: string;
    to: string;
    from: string;
    data: string;
    nonce: number;
    chainId: number;
  };
  simulation?: {
    isSuccess: boolean;
    amountsOut: string[];
    gasEstimate: number;
    simulationError: Record<string, any>; // Replace with a specific error type if known
  };
};

export type OdosQuoteResponse = {
  inTokens: string[];
  outTokens: string[];
  inAmounts: string[];
  outAmounts: string[];
  gasEstimate: number;
  dataGasEstimate: number;
  gweiPerGas: number;
  gasEstimateValue: number;
  inValues: number[];
  outValues: number[];
  netOutValue: number;
  priceImpact: number;
  percentDiff: number;
  partnerFeePercent: number;
  pathId: string;
  pathViz: null; // If this can also be a string, change it to `string | null`
  blockNumber: number;
};
