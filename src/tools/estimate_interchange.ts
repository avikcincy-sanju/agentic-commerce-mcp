import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerEstimateInterchange(server: McpServer) {
  server.tool(
    "estimate_interchange",
    "Estimate a simplified interchange component for a payment volume.",
    {
      volume: z.number().default(1000000),
      card_rate_percent: z.number().default(2.5)
    },
    async ({ volume, card_rate_percent }) => {
      const interchange = volume * (card_rate_percent / 100);
      return text(`## Interchange Estimate

| Metric | Value |
| --- | ---: |
| Volume | ${volume.toFixed(2)} |
| Card rate | ${card_rate_percent.toFixed(2)}% |
| Estimated interchange | ${interchange.toFixed(2)} |

### Educational note
This is a simplified educational estimate and not a real processor quote.`);
    }
  );
}
