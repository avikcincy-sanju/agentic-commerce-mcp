import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerCompareSettlementCost(server: McpServer) {
  server.tool(
    "compare_settlement_cost",
    "Compare educational settlement cost profiles for traditional and stablecoin rails.",
    {
      volume: z.number().default(1000000),
      fx_spread: z.number().default(0.75),
      settlement_type: z.enum(["Traditional", "Stablecoin", "Hybrid"]).default("Hybrid")
    },
    async ({ volume, fx_spread, settlement_type }) => {
      const traditionalCost = volume * 0.0025;
      const stablecoinCost = volume * 0.001;
      const hybridCost = volume * 0.0017;
      const chosen = settlement_type === "Traditional" ? traditionalCost : settlement_type === "Stablecoin" ? stablecoinCost : hybridCost;

      return text(`## Settlement Cost Comparison

| Rail | Cost estimate |
| --- | ---: |
| Traditional | ${traditionalCost.toFixed(2)} |
| Stablecoin | ${stablecoinCost.toFixed(2)} |
| Hybrid | ${hybridCost.toFixed(2)} |

### Recommended approach
For a volume of ${volume.toFixed(2)} with an FX spread of ${fx_spread.toFixed(2)}%, the educational recommendation is ${settlement_type.toLowerCase()} settlement with an estimated cost of ${chosen.toFixed(2)}.`);
    }
  );
}
