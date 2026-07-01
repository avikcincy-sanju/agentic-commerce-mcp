export type ArchitectureDecisionInput = {
  businessModel: string;
  merchantOwnership: string;
  country: string;
  region: string;
  settlementPreference: string;
  scale: string;
  gmv: number;
  transactionVolume: number;
  crossBorderRequirements: string;
  marketplace: boolean;
  isv: boolean;
  platform: boolean;
  payFac: boolean;
  embeddedFinance: boolean;
  stablecoinPreference: string;
};

export type ArchitectureRecommendation = {
  recommendedArchitecture: string;
  reasoning: string;
  pros: string[];
  cons: string[];
  risks: string[];
  alternatives: string[];
  implementationComplexity: string;
};

function getComplexity(scale: string, gmv: number) {
  if (scale === "Enterprise" || gmv > 100000000) {
    return "High";
  }
  if (scale === "Mid-market" || gmv > 10000000) {
    return "Medium";
  }
  return "Low";
}

export function recommendPaymentArchitecture(input: ArchitectureDecisionInput): ArchitectureRecommendation {
  const crossBorder = input.crossBorderRequirements.toLowerCase().includes("yes") || input.region !== "Domestic";
  const stablecoin = input.stablecoinPreference.toLowerCase().includes("yes") || input.settlementPreference === "Stablecoin";
  const marketplace = input.marketplace || input.businessModel === "Marketplace";

  const recommendedArchitecture = marketplace
    ? "Marketplace MOR with a platform-led checkout, payout orchestration, and treasury controls"
    : input.payFac || input.isv
      ? "Platform PayFac with embedded payments and seller onboarding controls"
      : "ISO gateway with agent-ready routing and a managed merchant portfolio";

  const reasoning = crossBorder
    ? `For ${input.businessModel} in ${input.country}, a ${recommendedArchitecture.toLowerCase()} is appropriate because cross-border flows need strong routing, FX planning, and treasury controls.`
    : `For ${input.businessModel} in ${input.country}, ${recommendedArchitecture.toLowerCase()} balances control, speed, and operational simplicity.`;

  return {
    recommendedArchitecture,
    reasoning,
    pros: [
      "Clear operating model",
      "Deterministic settlement design",
      "Good fit for education and architecture review"
    ],
    cons: [
      "May require more implementation discipline",
      "Not suitable for live production assumptions"
    ],
    risks: [
      "Settlement timing mismatch",
      crossBorder ? "FX friction" : "Liquidity planning drift",
      stablecoin ? "Stablecoin custody and compliance complexity" : "Chargeback exposure"
    ],
    alternatives: [
      marketplace ? "Platform MOR" : "Licensee MOR",
      stablecoin ? "Traditional bank settlement" : "Stablecoin settlement"
    ],
    implementationComplexity: getComplexity(input.scale, input.gmv)
  };
}

export function recommendGtmStrategy(input: ArchitectureDecisionInput): ArchitectureRecommendation {
  const model = input.embeddedFinance || input.businessModel === "Enterprise"
    ? "Embedded Finance"
    : input.marketplace || input.businessModel === "Marketplace"
      ? "Marketplace"
      : input.payFac || input.isv
        ? "Platform PayFac"
        : "ISO Gateway";

  return {
    recommendedArchitecture: model,
    reasoning: `A ${model} strategy is appropriate when ${input.businessModel.toLowerCase()} needs a clear commercial packaging model with predictable ownership and controls.`,
    pros: ["Simple commercial framing", "Good executive communication", "Easy to map to channels"],
    cons: ["Can over-simplify complex product needs"],
    risks: ["Architecture drift if the operating model is not aligned"],
    alternatives: ["Platform MOR", "Agentic Gateway", "PayFac-as-a-Service"],
    implementationComplexity: getComplexity(input.scale, input.gmv)
  };
}

export function recommendMorStrategy(input: ArchitectureDecisionInput): ArchitectureRecommendation {
  const model = input.marketplace || input.businessModel === "Marketplace"
    ? "Marketplace MOR"
    : input.merchantOwnership === "Platform"
      ? "Merchant of Record"
      : "Licensee MOR";

  return {
    recommendedArchitecture: model,
    reasoning: `The ${model} model best fits a ${input.businessModel.toLowerCase()} operating context where ownership, compliance, and payout responsibility must be explicit.`,
    pros: ["Clear liability model", "Good for platform-led flows"],
    cons: ["Can increase treasury obligations"],
    risks: ["Higher operating complexity"],
    alternatives: ["Platform MOR", "Merchant of Record", "Licensee MOR"],
    implementationComplexity: getComplexity(input.scale, input.gmv)
  };
}

export function recommendSettlementStrategy(input: ArchitectureDecisionInput): ArchitectureRecommendation {
  const model = input.stablecoinPreference === "Yes" || input.settlementPreference === "Stablecoin"
    ? "USDC settlement with traditional fallback"
    : input.crossBorderRequirements.toLowerCase().includes("yes")
      ? "Traditional cross-border settlement with FX controls"
      : "Traditional domestic settlement";

  return {
    recommendedArchitecture: model,
    reasoning: `The ${model.toLowerCase()} approach is suitable because settlement choice should reflect the place, speed, and treasury requirements of the transaction.`,
    pros: ["Matches settlement objectives", "Supports treasury planning"],
    cons: ["Traditional rails may be slower"],
    risks: ["Cross-border payment timing", "Stablecoin custody controls"],
    alternatives: ["ACH", "SWIFT", "Card settlement"],
    implementationComplexity: getComplexity(input.scale, input.gmv)
  };
}

export function recommendTreasuryArchitecture(input: ArchitectureDecisionInput): ArchitectureRecommendation {
  const architecture = input.gmv > 50000000 ? "Multi-currency treasury with reserve controls" : "Basic treasury reserve and reconciliation workflow";
  return {
    recommendedArchitecture: architecture,
    reasoning: `A ${architecture.toLowerCase()} is appropriate for the expected scale of ${input.businessModel.toLowerCase()} flows.`,
    pros: ["Improves liquidity visibility", "Supports payout discipline"],
    cons: ["Requires stronger operations"],
    risks: ["Reserve mismanagement", "Reconciliation gaps"],
    alternatives: ["Single-currency reserve", "Treasury hub with manual approval"],
    implementationComplexity: getComplexity(input.scale, input.gmv)
  };
}

export function recommendCrossborderModel(input: ArchitectureDecisionInput): ArchitectureRecommendation {
  const architecture = input.region === "Global" || input.crossBorderRequirements.toLowerCase().includes("yes")
    ? "Localized payment orchestration with FX and local rails"
    : "Domestic payment orchestration";
  return {
    recommendedArchitecture: architecture,
    reasoning: `Cross-border needs favor ${architecture.toLowerCase()} because local methods, FX, and settlement timing differ materially by market.`,
    pros: ["Better local fit", "Improves conversion"],
    cons: ["Higher complexity"],
    risks: ["Regulatory variance", "FX friction"],
    alternatives: ["Single global rail", "Partner-led local rails"],
    implementationComplexity: getComplexity(input.scale, input.gmv)
  };
}

export function recommendAgenticArchitecture(input: ArchitectureDecisionInput): ArchitectureRecommendation {
  const architecture = input.businessModel === "Marketplace"
    ? "Agent-driven commerce with delegated authority and marketplace orchestration"
    : "Agent-ready merchant endpoint with policy-driven payment routing";
  return {
    recommendedArchitecture: architecture,
    reasoning: `The ${architecture.toLowerCase()} pattern is ideal for agentic commerce because the buying experience is intent-led and the backend can remain deterministic.`,
    pros: ["Natural for AI commerce journeys", "Clear policy hooks"],
    cons: ["Needs explicit guardrails"],
    risks: ["Prompt misuse", "Unexpected routing decisions"],
    alternatives: ["Human-assisted checkout", "Manual merchant selection"],
    implementationComplexity: getComplexity(input.scale, input.gmv)
  };
}
