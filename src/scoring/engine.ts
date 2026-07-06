export interface ScoringDimensions {
  cost: number;
  risk: number;
  complexity: number;
  scalability: number;
  developerExperience: number;
  globalCoverage: number;
  settlementSpeed: number;
  treasuryEfficiency: number;
  stablecoinReadiness: number;
  marketplaceReadiness: number;
}

export interface ScoredVendor {
  vendor: string;
  overallScore: number;
  radarTable: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function scoreVendor({ vendor, dimensions }: { vendor: string; dimensions: ScoringDimensions }): ScoredVendor {
  const weights = {
    cost: 0.12,
    risk: 0.12,
    complexity: 0.1,
    scalability: 0.12,
    developerExperience: 0.1,
    globalCoverage: 0.1,
    settlementSpeed: 0.1,
    treasuryEfficiency: 0.08,
    stablecoinReadiness: 0.08,
    marketplaceReadiness: 0.08
  } as const;

  const overallScore = clamp(
    Object.entries(weights).reduce((total, [key, weight]) => {
      const value = dimensions[key as keyof ScoringDimensions];
      return total + value * weight;
    }, 0)
  );

  const strengths = [
    overallScore >= 85 ? "Excellent balance of capability and simplicity" : "Strong core payment functionality",
    dimensions.scalability >= 85 ? "High scalability posture" : "Solid growth readiness"
  ];
  const weaknesses = [
    dimensions.complexity >= 85 ? "Complex operating model" : "Moderate implementation overhead",
    dimensions.treasuryEfficiency < 70 ? "Treasury efficiency requires additional planning" : "Treasury efficiency is acceptable"
  ];
  const recommendations = [
    `Prioritize ${vendor} for low-to-medium complexity launch scenarios`,
    `Pair with treasury and risk controls to reduce operational friction`
  ];

  const radarTable = [
    "| Dimension | Score |",
    "| --- | ---: |",
    `| Cost | ${dimensions.cost} |`,
    `| Risk | ${dimensions.risk} |`,
    `| Complexity | ${dimensions.complexity} |`,
    `| Scalability | ${dimensions.scalability} |`,
    `| Developer Experience | ${dimensions.developerExperience} |`,
    `| Global Coverage | ${dimensions.globalCoverage} |`,
    `| Settlement Speed | ${dimensions.settlementSpeed} |`,
    `| Treasury Efficiency | ${dimensions.treasuryEfficiency} |`,
    `| Stablecoin Readiness | ${dimensions.stablecoinReadiness} |`,
    `| Marketplace Readiness | ${dimensions.marketplaceReadiness} |`
  ].join("\n");

  return { vendor, overallScore, radarTable, strengths, weaknesses, recommendations };
}
