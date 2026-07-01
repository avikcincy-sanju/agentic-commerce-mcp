#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "agentic-commerce-architecture-mcp",
  version: "0.1.0"
});

function text(content: string) {
  return {
    content: [
      {
        type: "text" as const,
        text: content
      }
    ]
  };
}

server.tool(
  "compare_channels",
  "Compare ISV, ISO, and Marketplace/MOR channel models in agentic commerce.",
  {
    channel: z.enum(["ISV", "ISO", "Marketplace/MOR", "All"]).default("All")
  },
  async ({ channel }) => {
    const all = `
Agentic commerce channels answer one core question: who owns the merchant relationship?

ISV:
- Owns the seller relationship
- Uses its own merchant graph
- Can embed payments and financial services
- Best for platform PayFac, PayFac-as-a-Service, and embedded finance models

ISO:
- Owns access and routing
- Uses existing merchant portfolios and MIDs
- Adds an agentic gateway on top of existing merchant relationships
- Best for low-disruption enablement

Marketplace/MOR:
- Owns the customer transaction
- Operates the catalogue or marketplace
- Seller is often paid through a payout rail rather than acting as direct merchant
- Best for marketplace and platform-MOR models
`;

    return text(channel === "All" ? all : `${channel}\n\n${all}`);
  }
);

server.tool(
  "compare_gtm_models",
  "Explain how GTM models map to channel ownership models.",
  {
    model: z
      .enum([
        "Platform PayFac",
        "PayFac-as-a-Service",
        "Embedded Finance",
        "ISO Gateway",
        "Agentic Gateway",
        "Marketplace",
        "Platform MOR",
        "All"
      ])
      .default("All")
  },
  async ({ model }) => {
    const all = `
GTM models describe commercial packaging. Channels describe ownership architecture.

Platform PayFac:
- Channel: ISV
- Platform owns seller, onboarding, risk, payment operations, and economics
- Highest control and highest responsibility

PayFac-as-a-Service:
- Channel: ISV
- Platform controls seller experience, splits, pricing, and payouts
- Regulated infrastructure burden is handled by an enabling provider

Embedded Finance:
- Channel: ISV
- Extends payments into financial lifecycle: accounts, cards, working capital, and payouts

ISO Gateway:
- Channel: ISO
- Makes existing merchant portfolios agent-accessible with minimal stack change

Agentic Gateway:
- Channel: ISO
- Adds MCP-style access and routing over existing merchants

Marketplace:
- Channel: Marketplace/MOR
- Platform owns discovery, checkout, customer experience, and transaction flow

Platform MOR:
- Channel: Marketplace/MOR
- Platform is merchant of record and pays sellers as payees
`;

    return text(model === "All" ? all : `${model}\n\n${all}`);
  }
);

server.tool(
  "simulate_agentic_checkout",
  "Simulate a simple agentic commerce checkout flow.",
  {
    channel: z.enum(["ISV", "ISO", "Marketplace/MOR"]).default("ISV"),
    settlement: z
      .enum(["Domestic Traditional", "Cross-border Traditional", "Domestic USDC", "Cross-border USDC"])
      .default("Domestic Traditional"),
    payment_method: z.enum(["Visa", "Mastercard", "USDC Wallet"]).default("Visa")
  },
  async ({ channel, settlement, payment_method }) => {
    return text(`
Agentic checkout simulation

Buyer intent:
"Book the best available service provider for Saturday morning."

Step 1 — Buyer intent:
The buyer expresses intent in natural language.

Step 2 — MCP/tool call:
The AI agent calls the merchant endpoint.

Selected channel:
${channel}

Selected settlement:
${settlement}

Selected payment method:
${payment_method}

Step 3 — Matching and routing:
- ISV: queries its own sub-merchant graph
- ISO: routes through an existing merchant routing table
- Marketplace/MOR: selects from its own catalogue

Step 4 — Authorization:
Payment authorization is driven by the selected payment method.

Step 5 — Confirmation:
The agent confirms booking and payment status.

Step 6 — Financial layer:
Settlement and payout happen downstream based on the selected rail.

Key point:
The buyer experience is similar across channels. The architecture changes behind the scenes based on ownership, routing, and settlement.
`);
  }
);

server.tool(
  "compare_settlement_rails",
  "Compare traditional and stablecoin settlement rails.",
  {
    rail: z
      .enum(["Domestic Traditional", "Cross-border Traditional", "Domestic USDC", "Cross-border USDC", "All"])
      .default("All")
  },
  async ({ rail }) => {
    const all = `
Settlement rails are independent from the buyer's authorization method.

Domestic Traditional:
- Card/ACH settlement
- Domestic currency
- Existing bank rails
- Interchange and processing economics apply

Cross-border Traditional:
- Local payment rail plus FX layer
- Correspondent banking or cross-border settlement steps may apply
- Settlement timing and FX cost become important

Domestic USDC:
- On-chain USD-pegged settlement
- No card interchange at the settlement layer
- Useful where wallet-based settlement is supported

Cross-border USDC:
- On-chain USDC settlement across geography
- Can reduce correspondent banking dependency
- Seller may still convert locally depending on market needs

Key point:
Card authorization and stablecoin settlement can be separate layers. A buyer can authenticate with a card while the seller is paid through a different settlement rail.
`;

    return text(rail === "All" ? all : `${rail}\n\n${all}`);
  }
);

server.tool(
  "explain_merchant_endpoint",
  "Explain the merchant endpoint concept in agent-driven commerce.",
  {},
  async () => {
    return text(`
The merchant endpoint is the agent-accessible interface through which AI agents discover, select, transact with, and confirm merchants.

In traditional commerce:
Search → Website → Checkout form → Card entry

In agentic commerce:
Buyer intent → AI agent → Merchant endpoint → Authorization → Settlement → Confirmation

Why it matters:
The platform that becomes the merchant endpoint can influence discovery, routing, payment initiation, settlement choice, and the seller financial layer.

Channel ownership determines how the endpoint works:
- ISV: endpoint exposes the ISV's sub-merchant graph
- ISO: endpoint routes into existing merchant portfolios
- Marketplace/MOR: endpoint exposes the platform's own catalogue and transaction flow
`);
  }
);

server.tool(
  "recommend_architecture",
  "Recommend a simulated architecture for an agentic commerce scenario.",
  {
    business_type: z.enum(["ISV", "ISO", "Marketplace", "Enterprise"]).default("ISV"),
    geography: z.enum(["Domestic", "Cross-border", "Global"]).default("Domestic"),
    priority: z.enum(["Control", "Speed", "Compliance simplicity", "Cost optimization"]).default("Control")
  },
  async ({ business_type, geography, priority }) => {
    let channel = "ISV";
    let gtmModel = "Platform PayFac";
    let settlementRail = geography === "Domestic" ? "Domestic Traditional" : "Cross-border Traditional";
    let why = "This keeps ownership close to the seller and preserves the highest level of control.";

    if (business_type === "Marketplace") {
      channel = "Marketplace/MOR";
      gtmModel = "Marketplace";
      settlementRail = geography === "Global" ? "Cross-border USDC" : settlementRail;
      why = "Marketplace ownership is a natural fit when the platform wants to manage checkout, catalogue, and payout orchestration.";
    } else if (business_type === "ISO") {
      channel = "ISO";
      gtmModel = geography === "Global" ? "Agentic Gateway" : "ISO Gateway";
      why = "An ISO can expose agent-ready access over an existing merchant portfolio without re-architecting the full stack.";
    } else if (business_type === "Enterprise") {
      channel = "ISV";
      gtmModel = "Embedded Finance";
      why = "Enterprise buyers often need deeper financial services and policy control beyond simple acceptance.";
    }

    if (priority === "Speed") {
      channel = business_type === "Marketplace" ? "Marketplace/MOR" : "ISO";
      gtmModel = business_type === "Marketplace" ? "Marketplace" : "Agentic Gateway";
      settlementRail = geography === "Global" ? "Cross-border USDC" : settlementRail;
      why = "This prioritizes rapid routing, simpler onboarding, and faster payout experiences for the buyer and seller.";
    } else if (priority === "Compliance simplicity") {
      channel = "ISO";
      gtmModel = "ISO Gateway";
      settlementRail = geography === "Domestic" ? "Domestic Traditional" : "Cross-border Traditional";
      why = "This leans on established merchant relationships and a more predictable compliance model.";
    } else if (priority === "Cost optimization") {
      settlementRail = geography === "Global" ? "Cross-border USDC" : "Domestic USDC";
      why = "This reduces dependency on some traditional cross-border banking steps and can lower settlement friction for the scenario.";
    }

    return text(`
Simulated architecture recommendation
Business type: ${business_type}
Geography: ${geography}
Priority: ${priority}

Recommended channel: ${channel}
Recommended GTM model: ${gtmModel}
Recommended settlement rail: ${settlementRail}

Why: ${why}

Educational note: This is a static, simulated recommendation for learning purposes only and does not connect to any real payment network.
`);
  }
);

server.tool(
  "calculate_payment_cost",
  "Estimate a simulated payment cost breakdown for a commerce scenario.",
  {
    volume: z.number(),
    average_ticket: z.number(),
    card_rate_percent: z.number(),
    fixed_fee: z.number(),
    fx_spread_percent: z.number().default(0)
  },
  async ({ volume, average_ticket, card_rate_percent, fixed_fee, fx_spread_percent }) => {
    const cardProcessingCost = volume * (card_rate_percent / 100) + fixed_fee;
    const fxCost = volume * (fx_spread_percent / 100);
    const totalCost = cardProcessingCost + fxCost;
    const effectiveCostPercent = volume > 0 ? (totalCost / volume) * 100 : 0;
    const approximateTransactions = average_ticket > 0 ? volume / average_ticket : 0;

    return text(`
Simulated payment cost estimate
Total volume: ${volume.toFixed(2)}
Average ticket: ${average_ticket.toFixed(2)}
Approximate transactions: ${approximateTransactions.toFixed(0)}

Card processing cost: ${cardProcessingCost.toFixed(2)}
FX cost: ${fxCost.toFixed(2)}
Total cost: ${totalCost.toFixed(2)}
Effective cost percent: ${effectiveCostPercent.toFixed(2)}%

Educational note: This is a static estimate for teaching architecture tradeoffs and does not reflect real pricing from a live processor.
`);
  }
);

server.tool(
  "simulate_treasury_flow",
  "Simulate how funds move through a treasury flow for an agentic commerce scenario.",
  {
    channel: z.enum(["ISV", "ISO", "Marketplace/MOR"]).default("ISV"),
    settlement: z.enum(["Traditional", "USDC"]).default("Traditional"),
    payout_timing: z.enum(["Same day", "T+1", "T+2", "Weekly"]).default("T+1")
  },
  async ({ channel, settlement, payout_timing }) => {
    let flow = "";

    if (channel === "Marketplace/MOR") {
      flow = "The buyer pays through the marketplace checkout, the platform receives the funds, and the seller is paid later through a payout step managed by the platform.";
    } else if (channel === "ISO") {
      flow = "The buyer pays through an agent-enabled merchant route, funds are collected by the merchant relationship owner, and the ISO or its downstream partner handles the payout to the merchant.";
    } else {
      flow = "The buyer pays through the ISV-enabled merchant relationship, funds are captured and routed through the ISV's merchant flow, and the seller receives a payout from the platform-led settlement layer.";
    }

    const settlementRisk = settlement === "USDC"
      ? "Settlement risk shifts toward wallet custody, chain confirmation, and conversion or on-ramp steps if the seller needs local funds."
      : "Settlement risk remains concentrated in bank timing, reconciliation, reserve balances, chargebacks, and delayed payout exposure.";

    return text(`
Simulated treasury flow
Channel: ${channel}
Settlement rail: ${settlement}
Payout timing: ${payout_timing}

How funds move:
1. The buyer authorizes a payment through the selected channel.
2. The payment is captured and routed through the chosen settlement rail.
3. ${flow}
4. The platform or seller receives funds according to the selected payout timing.

Where settlement risk exists:
- Authorization and chargeback exposure
- Timing mismatch between capture and payout
- Reserve or liquidity pressure if the platform holds funds temporarily
- ${settlementRisk}

Treasury controls that matter:
- Reserve balances and payout limits
- Daily reconciliation and exception monitoring
- Fraud and chargeback controls
- Approval thresholds for manual payouts
- Clear rules for FX, conversion, and liquidity planning

Educational note: This is a static simulation for architecture education and not a live payment workflow.
`);
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
