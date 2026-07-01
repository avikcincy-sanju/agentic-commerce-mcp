export type KnowledgeEntry = {
  id: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "payments-architecture",
    category: "Payments",
    title: "Payments Architecture",
    summary: "An educational overview of merchant, PSP, acquirer, settlement, treasury, and ERP layers.",
    tags: ["payments", "architecture", "settlement", "treasury"]
  },
  {
    id: "stablecoins",
    category: "Stablecoins",
    title: "Stablecoin Settlement",
    summary: "A deterministic overview of stablecoin settlement, custody, liquidity, and compliance considerations.",
    tags: ["stablecoin", "usdc", "settlement", "treasury"]
  },
  {
    id: "cross-border",
    category: "Cross-border",
    title: "Cross-Border Payments",
    summary: "A simplified look at FX, local rails, regulatory variance, and payout design.",
    tags: ["cross-border", "fx", "payments"]
  },
  {
    id: "agentic-commerce",
    category: "Agentic Commerce",
    title: "Agentic Commerce",
    summary: "A framework for intent-driven commerce, merchant endpoints, policy control, and orchestration.",
    tags: ["agentic", "commerce", "merchant-endpoint"]
  },
  {
    id: "marketplace-payments",
    category: "Marketplace",
    title: "Marketplace Payments",
    summary: "A structured view of seller onboarding, payouts, reserve controls, and marketplace-led settlement.",
    tags: ["marketplace", "payouts", "seller"]
  },
  {
    id: "merchant-onboarding",
    category: "Merchant Onboarding",
    title: "Merchant Onboarding",
    summary: "A deterministic onboarding workflow covering intake, KYC, underwriting, and enablement.",
    tags: ["onboarding", "kyc", "underwriting"]
  }
];

export function searchKnowledge(query: string, category?: string) {
  const normalizedQuery = query.toLowerCase();
  return knowledgeBase.filter((entry) => {
    const matchesCategory = category ? entry.category.toLowerCase() === category.toLowerCase() : true;
    return matchesCategory && (
      entry.title.toLowerCase().includes(normalizedQuery) ||
      entry.summary.toLowerCase().includes(normalizedQuery) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );
  });
}
