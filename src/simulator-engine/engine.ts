export interface PaymentSimulationInput {
  transactionVolume: number;
  countries: number;
  currencies: number;
  gmv: number;
  settlementRail: string;
  psp: string;
  marketplaceModel: string;
  merchantOwnership: string;
}

export interface PaymentSimulationOutput {
  authorizationRate: number;
  settlementTime: number;
  treasuryFloat: number;
  reserveEstimate: number;
  fxCosts: number;
  processingCosts: number;
  revenue: number;
  payoutTiming: number;
  operationalComplexity: number;
  riskScore: number;
}

function normalize(value: number, factor: number) {
  return Number((value * factor).toFixed(2));
}

export function simulatePaymentScenario(input: PaymentSimulationInput): PaymentSimulationOutput {
  const authorizationRate = 96 + Math.min(input.countries, 5) * 0.4;
  const settlementTime = input.settlementRail.includes("USDC") ? 1 : input.settlementRail.includes("Traditional") ? 2 : 3;
  const treasuryFloat = normalize(input.gmv, 0.0008 + input.countries * 0.0001);
  const reserveEstimate = normalize(input.gmv, 0.0005 + input.currencies * 0.0001);
  const fxCosts = normalize(input.gmv, 0.00015 + input.currencies * 0.00003);
  const processingCosts = normalize(input.transactionVolume, 0.00018 + (input.psp === "Adyen" ? 0.00002 : 0.00001));
  const revenue = normalize(input.gmv, 0.0012 + (input.marketplaceModel === "Marketplace" ? 0.0002 : 0));
  const payoutTiming = input.merchantOwnership === "Platform" ? 2 : 3;
  const operationalComplexity = Math.min(100, 40 + input.countries * 8 + input.currencies * 7);
  const riskScore = Math.min(100, 20 + input.countries * 6 + (input.settlementRail.includes("USDC") ? 5 : 0));

  return {
    authorizationRate: Number(authorizationRate.toFixed(2)),
    settlementTime,
    treasuryFloat,
    reserveEstimate,
    fxCosts,
    processingCosts,
    revenue,
    payoutTiming,
    operationalComplexity,
    riskScore
  };
}
