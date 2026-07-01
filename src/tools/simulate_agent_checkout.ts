import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerSimulateAgentCheckout(server: McpServer) {
  server.tool(
    "simulate_agent_checkout",
    "Simulate a complete agent-driven checkout journey.",
    {
      channel: z.enum(["ISV", "ISO", "Marketplace/MOR"]).default("ISV"),
      payment_method: z.enum(["Visa", "Mastercard", "USDC Wallet"]).default("Visa"),
      settlement: z.enum(["Traditional", "USDC"]).default("Traditional")
    },
    async ({ channel, payment_method, settlement }) => {
      return text(`## Agent Checkout Simulation

Customer → AI Agent → Merchant → PSP → Acquirer → Settlement → Treasury → ERP

### Step-by-step
1. The customer states an intent such as booking a service or buying a product.
2. The AI agent interprets the intent and selects a merchant endpoint.
3. The merchant or marketplace confirms the offer and price.
4. The PSP authorizes the payment using ${payment_method}.
5. The acquirer and settlement layer process the payment through ${settlement} rails.
6. Funds are routed to treasury and then to the ERP or accounting layer.

### Educational note
This is a deterministic educational payment journey and not a live transaction.`);
    }
  );
}
