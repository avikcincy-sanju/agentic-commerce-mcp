import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerEstimateStablecoinSavings(server: McpServer) {
  server.tool(
    "estimate_stablecoin_savings",
    "Estimate simple savings from using a stablecoin rail over traditional settlement.",
    {
      volume: z.number().default(1000000),
      traditional_cost_percent: z.number().default(0.25),
      stablecoin_cost_percent: z.number().default(0.1)
    },
    async ({ volume, traditional_cost_percent, stablecoin_cost_percent }) => {
      const traditionalCost = volume * (traditional_cost_percent / 100);
      const stablecoinCost = volume * (stablecoin_cost_percent / 100);
      const savings = traditionalCost - stablecoinCost;

      return text(`## Stablecoin Savings Estimate

| Metric | Value |
| --- | ---: |
| Volume | ${volume.toFixed(2)} |
| Traditional cost | ${traditionalCost.toFixed(2)} |
| Stablecoin cost | ${stablecoinCost.toFixed(2)} |
| Estimated savings | ${savings.toFixed(2)} |

### Educational note
This is a simplified educational estimate for architecture discussions.`);
    }
  );
}
