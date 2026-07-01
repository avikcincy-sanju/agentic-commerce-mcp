import { morModels, vendorKnowledge } from "../knowledge/payments.js";

export function recommendGtmModel(businessType: string, ownershipPriority: string) {
  const base = {
    ISV: {
      gtmModel: "Platform PayFac",
      why: "This gives the platform direct control over the seller relationship and payment experience.",
      advantages: ["High control", "Clear seller economics", "Strong platform-led experience"],
      risks: ["Higher compliance and operations burden", "More responsibility for merchant risk"]
    },
    ISO: {
      gtmModel: "ISO Gateway",
      why: "This fits an organization that wants to expose payments through an existing merchant portfolio.",
      advantages: ["Lower stack disruption", "Uses existing merchant relationships", "Good for rapid enablement"],
      risks: ["Less direct control over the end-to-end experience", "Higher dependency on sponsor relationships"]
    },
    Marketplace: {
      gtmModel: "Marketplace",
      why: "The platform owns the catalogue, checkout, and customer experience while routing funds to sellers.",
      advantages: ["Excellent customer experience", "Strong inventory and orchestration control", "Good for multi-seller growth"],
      risks: ["Complex payout and seller onboarding", "Higher operational complexity"]
    },
    Enterprise: {
      gtmModel: "Embedded Finance",
      why: "Enterprise buyers often need finance capabilities that go beyond simple acceptance.",
      advantages: ["Broader product value", "More strategic wallet and financing use cases", "Higher defensibility"],
      risks: ["More complex product scope", "Higher compliance and execution burden"]
    }
  };

  const recommended = base[businessType as keyof typeof base] ?? base.ISV;

  if (ownershipPriority === "Speed") {
    recommended.gtmModel = businessType === "Marketplace" ? "Marketplace" : "Agentic Gateway";
    recommended.why = "This shortens time to value by leaning on a lighter operational footprint and faster routing model.";
    recommended.advantages = ["Fast rollout", "Lower friction", "Good for rapid pilots"];
    recommended.risks = ["May be less comprehensive for mature scale", "Can trade off long-term control"];
  } else if (ownershipPriority === "Embedded Finance") {
    recommended.gtmModel = "Embedded Finance";
    recommended.why = "The platform can expand from payments into accounts, cards, and financing on top of the commerce layer.";
    recommended.advantages = ["Higher product expansion", "Stronger ecosystem lock-in", "Better economics over time"];
    recommended.risks = ["More regulatory complexity", "Requires stronger financial operations" ];
  } else if (ownershipPriority === "Marketplace") {
    recommended.gtmModel = "Platform MOR";
    recommended.why = "This is a natural fit when the platform wants to own the transaction and the payout experience.";
    recommended.advantages = ["High control", "Centralized settlement", "Clear marketplace economics"];
    recommended.risks = ["Higher treasury operating burden", "Greater liability exposure"];
  }

  return recommended;
}

export function recommendPsp(region: string, merchantSize: string, businessModel: string) {
  const recommendations = [];

  if (region === "Latin America") {
    recommendations.push("dLocal");
  }
  if (region === "Southeast Asia") {
    recommendations.push("Xendit");
  }
  if (region === "Global" || region === "Cross-border") {
    recommendations.push("Adyen", "Checkout.com", "Airwallex");
  }
  if (merchantSize === "Enterprise" || businessModel === "Marketplace") {
    recommendations.push("Stripe", "Adyen");
  }
  if (region === "United States" || region === "North America") {
    recommendations.push("Stripe", "Checkout.com");
  }

  const unique = Array.from(new Set(recommendations));
  return unique.slice(0, 4).map((name) => {
    const vendor = vendorKnowledge[name];
    return {
      name,
      why: `${vendor.name} is a strong fit because it offers ${vendor.strengths[0].toLowerCase()} and ${vendor.strengths[1].toLowerCase()} for ${businessModel.toLowerCase()} scenarios.`,
      notes: vendor.notes
    };
  });
}

export function recommendMorModel(businessType: string, countries: string) {
  if (businessType === "Marketplace") {
    return morModels[2];
  }
  if (countries.includes(",") || countries.length > 8) {
    return morModels[1];
  }
  if (businessType === "Enterprise") {
    return morModels[3];
  }
  return morModels[0];
}

export function architectureDecisionEngine(inputs: {
  businessModel: string;
  country: string;
  expectedGmv: number;
  settlementPreference: string;
  merchantOwnership: string;
}) {
  const psp = inputs.expectedGmv > 100000000 ? "Adyen" : "Stripe";
  const gtm = inputs.businessModel === "Marketplace" ? "Marketplace" : "Platform PayFac";
  const settlement = inputs.settlementPreference === "Stablecoin" ? "USDC" : "Traditional";
  const treasury = inputs.expectedGmv > 50000000 ? "Multi-currency treasury" : "Basic reserve management";
  const merchantModel = inputs.merchantOwnership === "Platform-owned" ? "Merchant of Record" : "Licensee MOR";
  const paymentMethods = inputs.country === "Brazil" ? ["Cards", "PIX"] : inputs.country === "India" ? ["Cards", "UPI"] : ["Cards", "Wallets"];
  const risks = [
    "Settlement timing mismatches",
    "Chargebacks and fraud",
    "FX conversion friction",
    "Liquidity reserve management"
  ];

  return {
    psp,
    gtm,
    settlement,
    treasury,
    merchantModel,
    paymentMethods,
    risks,
    architectureSummary: `For ${inputs.businessModel} in ${inputs.country}, a ${gtm} style model with ${psp} and ${settlement} settlement is a practical educational recommendation.`
  };
}
