import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerSimulateMarketplace(server: McpServer) {
  server.tool(
    "simulate_marketplace",
    "Simulate a marketplace payment journey with seller payouts.",
    {
      buyers: z.number().default(1),
      sellers: z.number().default(3),
      settlement: z.enum(["Traditional", "USDC"]).default("Traditional")
    },
    async ({ buyers, sellers, settlement }) => {
      return text(`## Marketplace Simulation

Customer → AI Agent → Marketplace → Seller routing → PSP → Settlement → Treasury → Seller payout

### Flow
1. A customer selects a product from the marketplace.
2. The marketplace agent confirms pricing and seller routing for ${sellers} sellers.
3. Payment is authorized and captured for ${buyers} buyer intents.
4. Funds are routed through ${settlement} settlement rails.
5. The marketplace applies fees and schedules seller payouts.

### Educational note
This is a deterministic educational marketplace flow.`);
    }
  );
}
