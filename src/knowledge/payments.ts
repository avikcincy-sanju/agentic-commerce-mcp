export type VendorKnowledge = {
  name: string;
  strengths: string[];
  idealFor: string[];
  marketplaceSupport: string;
  treasury: string;
  fx: string;
  crossBorder: string;
  embeddedFinance: string;
  stablecoins: string;
  onboarding: string;
  reporting: string;
  risk: string;
  settlement: string;
  processingPercent: number;
  fixedFee: number;
  notes: string[];
};

export const vendorKnowledge: Record<string, VendorKnowledge> = {
  Stripe: {
    name: "Stripe",
    strengths: ["Developer experience", "Fast onboarding", "Broad payment methods"],
    idealFor: ["Digital-first SaaS", "Marketplaces", "Online sellers"],
    marketplaceSupport: "Good for marketplace-led flows with Connect and configurable payout logic.",
    treasury: "Strong product maturity with payouts and balance management.",
    fx: "Solid FX support, especially for common cross-border scenarios.",
    crossBorder: "Good across many regions with a broad ecosystem.",
    embeddedFinance: "Good for embedded financial products and platform-led services.",
    stablecoins: "Increasing support via programmable payments and partner integrations.",
    onboarding: "Fast and well documented for many merchants.",
    reporting: "Clear reporting and event-driven data model.",
    risk: "Good controls but may require more configuration for complex risk strategies.",
    settlement: "Supports card, bank, local methods, and payout orchestration.",
    processingPercent: 0.029,
    fixedFee: 0.3,
    notes: ["Popular default choice for startups and digital products."]
  },
  Adyen: {
    name: "Adyen",
    strengths: ["Enterprise-grade platform", "Global acquiring", "Rich capabilities"],
    idealFor: ["Large merchants", "Global enterprises", "High-volume commerce"],
    marketplaceSupport: "Excellent for complex marketplace and multi-entity setups.",
    treasury: "Strong treasury and settlement management for enterprise teams.",
    fx: "High-quality FX and treasury controls.",
    crossBorder: "Excellent for multinational payment operations.",
    embeddedFinance: "Strong when the business wants deeper financial products.",
    stablecoins: "Relevant for future-facing treasury architecture but not the default choice for every team.",
    onboarding: "More involved than simpler providers due to enterprise complexity.",
    reporting: "Robust analytics and settlement reporting.",
    risk: "Excellent controls, especially for mature organizations.",
    settlement: "Strong settlement and reconciliation options.",
    processingPercent: 0.031,
    fixedFee: 0.5,
    notes: ["Often chosen when scale and complexity justify a bigger platform."]
  },
  "Checkout.com": {
    name: "Checkout.com",
    strengths: ["Flexible APIs", "Global reach", "Enterprise support"],
    idealFor: ["Growth-stage firms", "Cross-border merchants", "Platforms"],
    marketplaceSupport: "Good support for marketplace orchestration and payout complexity.",
    treasury: "Good treasury and payout flexibility for modern platforms.",
    fx: "Competitive cross-border capabilities.",
    crossBorder: "Strong for international expansion.",
    embeddedFinance: "Useful where a platform wants to layer financial services on top of payments.",
    stablecoins: "Emerging support and strong interest in digital assets.",
    onboarding: "Reasonably fast once the merchant is ready for a more advanced stack.",
    reporting: "Solid reporting and analytics with configurable data views.",
    risk: "Strong fraud and risk tooling for larger merchants.",
    settlement: "Flexible funding and settlement approaches.",
    processingPercent: 0.03,
    fixedFee: 0.45,
    notes: ["A strong mid-to-enterprise option for global growth."]
  },
  Airwallex: {
    name: "Airwallex",
    strengths: ["Global accounts", "FX focus", "Multi-currency treasury"],
    idealFor: ["International sellers", "Treasury-heavy teams", "Cross-border platforms"],
    marketplaceSupport: "Good for platforms that need multi-currency payout and treasury workflows.",
    treasury: "A core strength for multi-currency treasury design.",
    fx: "Excellent FX positioning for cross-border operations.",
    crossBorder: "Excellent for global expansion and local settlement needs.",
    embeddedFinance: "Useful when the business wants a broader financial platform layer.",
    stablecoins: "Practical for treasury and settlement innovation.",
    onboarding: "Straightforward, especially for global teams.",
    reporting: "Strong reporting for treasury and finance stakeholders.",
    risk: "Good controls for growth-stage and global operations.",
    settlement: "Flexible settlement and payout options across currencies.",
    processingPercent: 0.031,
    fixedFee: 0.4,
    notes: ["Often favored when FX and treasury matter more than raw card acceptance breadth."]
  },
  dLocal: {
    name: "dLocal",
    strengths: ["LatAm expertise", "Local methods", "Cross-border optimization"],
    idealFor: ["Latin America", "Cross-border merchants", "Local payment-heavy businesses"],
    marketplaceSupport: "Valuable for marketplaces needing strong local-method support.",
    treasury: "Useful for payer and payee flows in emerging markets.",
    fx: "Good for regional complexity and local settlement options.",
    crossBorder: "Very strong in LatAm commerce.",
    embeddedFinance: "Appropriate for platform-led financial services in emerging markets.",
    stablecoins: "Relevant in regions where digital dollars matter.",
    onboarding: "Well-suited to merchants prioritizing local rails over global standardization.",
    reporting: "Good regional reporting, although it can feel more specialized.",
    risk: "Strong local expertise but may require more regional understanding.",
    settlement: "Strong for local payment methods and local payout rails.",
    processingPercent: 0.032,
    fixedFee: 0.35,
    notes: ["A practical choice for businesses where local methods drive conversion."]
  },
  Rapyd: {
    name: "Rapyd",
    strengths: ["Global payments", "Local methods", "Platform flexibility"],
    idealFor: ["Global merchants", "Multi-country expansion", "Fintech platforms"],
    marketplaceSupport: "Strong for marketplaces that need broad local payment coverage.",
    treasury: "Useful for payout and treasury orchestration across regions.",
    fx: "Good FX and cross-border simplification tools.",
    crossBorder: "Strong for international expansion and local rails.",
    embeddedFinance: "Supports platform-led financial features.",
    stablecoins: "Relevant for modern settlement stories.",
    onboarding: "Straightforward for teams that want global reach without building it themselves.",
    reporting: "Reasonable data and reporting capabilities.",
    risk: "Good capabilities for platform growth but still requires operating discipline.",
    settlement: "Broad local and global settlement support.",
    processingPercent: 0.031,
    fixedFee: 0.4,
    notes: ["A good fit for modern cross-border commerce and platform products."]
  },
  BVNK: {
    name: "BVNK",
    strengths: ["Stablecoin settlement", "Treasury innovation", "Digital assets"],
    idealFor: ["Treasury-led teams", "Stablecoin experiments", "Cross-border finance"],
    marketplaceSupport: "Useful for marketplaces exploring programmable settlement.",
    treasury: "Strong in digital-asset treasury and settlement concepts.",
    fx: "Relevant where digital dollars reduce traditional FX friction.",
    crossBorder: "Useful for cross-border settlement and wallet-based use cases.",
    embeddedFinance: "Helps teams build digital finance features.",
    stablecoins: "A specialist in stablecoin settlement.",
    onboarding: "More specialized and usually suited to teams with a clear digital-asset strategy.",
    reporting: "Good for digital treasury views but less universal than mainstream processors.",
    risk: "Requires careful controls for custody, liquidity, and compliance.",
    settlement: "Designed around programmable settlement and stablecoin flows.",
    processingPercent: 0.02,
    fixedFee: 0.25,
    notes: ["Best seen as an innovation-oriented partner rather than a default processor."]
  },
  Xendit: {
    name: "Xendit",
    strengths: ["Southeast Asia", "Local payments", "Regional expertise"],
    idealFor: ["SEA merchants", "Cross-border sellers", "Regional platforms"],
    marketplaceSupport: "Useful when the marketplace needs strong regional methods and payouts.",
    treasury: "Good for regional settlement and payout operations.",
    fx: "Practical options for regional currencies and payouts.",
    crossBorder: "Very useful in Southeast Asia.",
    embeddedFinance: "Relevant where a platform wants to offer financial services over payments.",
    stablecoins: "Emerging but not the core strength.",
    onboarding: "Fast for teams focused on a regional market.",
    reporting: "Straightforward regional reporting.",
    risk: "Strong regional fit with manageable complexity.",
    settlement: "Strong in local rails and payout configuration.",
    processingPercent: 0.028,
    fixedFee: 0.32,
    notes: ["A strong regional fit for SEA merchants and platforms."]
  }
};

export const localPaymentMethods: Record<string, string[]> = {
  Brazil: ["Cards", "PIX", "Bank transfer", "Wallets"],
  India: ["Cards", "UPI", "Wallets", "Bank transfer"],
  Netherlands: ["Cards", "iDEAL", "Bank transfer"],
  Germany: ["Cards", "SEPA", "Bank transfer"],
  Australia: ["Cards", "PayTo", "Bank transfer", "Wallets"],
  Singapore: ["Cards", "PayNow", "Wallets", "Bank transfer"],
  UnitedKingdom: ["Cards", "Bank transfer", "Wallets", "BNPL"],
  UnitedStates: ["Cards", "ACH", "Wallets", "Bank transfer"],
  Default: ["Cards", "Wallets", "Bank transfer", "BNPL"]
};

export const paymentRailKnowledge = {
  Visa: { type: "Card network", notes: ["Global card acceptance and strong brand recognition."] },
  Mastercard: { type: "Card network", notes: ["Global card acceptance with mature e-commerce support."] },
  PayPal: { type: "Wallet", notes: ["Popular wallet and consumer trust layer."] },
  UPI: { type: "Real-time payments", notes: ["India-based instant bank transfer rail."] },
  PIX: { type: "Real-time payments", notes: ["Brazilian instant payment rail."] },
  FedNow: { type: "Real-time payments", notes: ["US real-time payment rail."] },
  RTP: { type: "Real-time payments", notes: ["US real-time payment rail from The Clearing House."] },
  SEPA: { type: "Bank transfer", notes: ["European bank transfer scheme."] },
  ACH: { type: "Bank transfer", notes: ["US bank transfer and direct debit rail."] },
  Wire: { type: "Bank transfer", notes: ["High-value bank transfer."] },
  USDC: { type: "Stablecoin", notes: ["US dollar-pegged digital asset for programmable settlement."] },
  Stablecoins: { type: "Stablecoin", notes: ["Broader category for dollar-backed digital settlement."] },
  Marketplace: { type: "Commercial model", notes: ["Platform-led commerce where buyers and sellers interact through the platform."] },
  PayFac: { type: "Merchant model", notes: ["Platform becomes the merchant of record for its sub-merchants."] },
  ISO: { type: "Channel", notes: ["Independent sales organization that routes merchants through a sponsor."] },
  MerchantOfRecord: { type: "Merchant model", notes: ["Platform or partner accepts liability and handles settlement to sellers."] }
};

export const morModels = [
  {
    name: "Merchant of Record",
    description: "The platform accepts the merchant liability and settles to the seller.",
    bestFor: "Businesses that want the platform to own the customer payment experience and compliance obligations."
  },
  {
    name: "Licensee MOR",
    description: "A regulated partner operates the merchant of record function under the platform's brand.",
    bestFor: "Businesses that want a mature operating model without building the full compliance stack."
  },
  {
    name: "Marketplace MOR",
    description: "The marketplace owns the transaction and funds flow while sellers are paid through the platform.",
    bestFor: "Marketplaces with many sellers and a platform-led checkout experience."
  },
  {
    name: "Platform MOR",
    description: "The platform acts as merchant of record for the customer transaction and manages payouts internally.",
    bestFor: "High-control platforms with strong treasury and payments operations."
  }
];
