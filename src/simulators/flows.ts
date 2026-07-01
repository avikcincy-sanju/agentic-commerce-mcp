export function simulateAgentPaymentFlow(channel: string, paymentMethod: string, settlement: string) {
  return [
    `Buyer intent is captured by the agent for a ${channel} commerce journey.`,
    `The agent selects the merchant endpoint and initiates a payment request using ${paymentMethod}.`,
    `Authorization and risk checks are evaluated before funds can be captured.`,
    `Settlement is routed through ${settlement} rails and then payout logic is applied.`,
    `The agent confirms the transaction to the buyer and the merchant operations team.`
  ];
}

export function simulateMultiAgentMarketplaceFlow(buyers: number, sellers: number) {
  return {
    delegatedAuthority: `The buyer agent can act on behalf of the shopper, while the marketplace agent manages discovery, pricing, and seller routing for ${sellers} sellers.`,
    paymentOrchestration: `A central marketplace orchestration layer coordinates payments across ${buyers} buyer intents and ${sellers} seller accounts.`,
    risk: "The marketplace must monitor fraud, payout approval, and duplicate settlement events.",
    settlement: "Funds can be settled at the marketplace level and then distributed to sellers based on payout rules."
  };
}

export function simulateStablecoinSettlement(currency: string, destination: string) {
  return {
    traditionalFlow: `Funds move through banks, correspondent accounts, and local settlement rails before reaching ${destination}.`,
    stablecoinFlow: `Funds move as ${currency} stablecoins over a network, then are converted or distributed at the destination as needed.`,
    benefits: ["Faster settlement", "Programmable transfer logic", "Potentially lower cross-border friction"],
    risks: ["Custody risk", "Network congestion", "Conversion and compliance requirements"]
  };
}

export function generateArchitectureDiagram(merchant: string, psp: string, model: string, settlement: string) {
  return {
    ascii: `Customer\n  |\n${psp} Checkout\n  |\n${merchant}\n  |\n${model}\n  |\n${settlement}`,
    mermaid: `flowchart LR\nCustomer-->Checkout\nCheckout-->${merchant}\n${merchant}-->${model}\n${model}-->${settlement}`
  };
}
