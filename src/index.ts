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

const transport = new StdioServerTransport();
await server.connect(transport);
