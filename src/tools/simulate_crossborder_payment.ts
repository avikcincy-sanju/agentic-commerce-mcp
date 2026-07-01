import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerSimulateCrossborderPayment(server: McpServer) {
  server.tool(
    "simulate_crossborder_payment",
    "Simulate a cross-border payment journey with FX and local rails considerations.",
    {
      origin_country: z.string().default("UnitedStates"),
      destination_country: z.string().default("Brazil")
    },
    async ({ origin_country, destination_country }) => {
      return text(`## Cross-Border Payment Simulation

Customer → AI Agent → Merchant → PSP → FX Layer → Local Rail → Settlement → Treasury

### Flow
1. The buyer purchases in ${origin_country}.
2. The merchant routes the payment through a cross-border partner.
3. FX is applied and settlement is coordinated for ${destination_country}.
4. The local receiving method and payout schedule are determined.

### Educational note
This is a deterministic educational simulation for cross-border settlement design.`);
    }
  );
}
