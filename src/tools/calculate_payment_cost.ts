import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerCalculatePaymentCost(server: McpServer) {
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

      return text(`## Simulated Payment Cost Estimate

| Metric | Value |
| --- | ---: |
| Total volume | ${volume.toFixed(2)} |
| Average ticket | ${average_ticket.toFixed(2)} |
| Approximate transactions | ${approximateTransactions.toFixed(0)} |
| Card processing cost | ${cardProcessingCost.toFixed(2)} |
| FX cost | ${fxCost.toFixed(2)} |
| Total cost | ${totalCost.toFixed(2)} |
| Effective cost percent | ${effectiveCostPercent.toFixed(2)}% |

### Educational note
This is a static estimate for teaching architecture tradeoffs and does not reflect real pricing from a live processor.`);
    }
  );
}
