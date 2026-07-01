import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerSimulateAgenticCheckout(server: McpServer) {
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
      return text(`## Agentic Checkout Simulation

### Buyer Intent
"Book the best available service provider for Saturday morning."

### Flow
1. The buyer expresses intent in natural language.
2. The AI agent calls the merchant endpoint.
3. The channel and settlement path are selected.
4. Authorization and confirmation follow.
5. Settlement and payout occur downstream.

### Selected Inputs
- Channel: ${channel}
- Settlement: ${settlement}
- Payment method: ${payment_method}

### Educational Note
This is a deterministic teaching simulation and does not connect to any live payment network.`);
    }
  );
}
