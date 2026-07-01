import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { estimateFxCost } from "../calculators/estimates.js";

export function registerEstimateFxCost(server: McpServer) {
  server.tool(
    "estimate_fx_cost",
    "Estimate FX cost for a given transfer volume and spread.",
    {
      volume: z.number(),
      fx_spread: z.number()
    },
    async ({ volume, fx_spread }) => {
      const estimatedCost = estimateFxCost(volume, fx_spread);

      return text(`## FX Cost Estimate

| Metric | Value |
| --- | ---: |
| Volume | ${volume.toFixed(2)} |
| FX spread | ${fx_spread.toFixed(2)}% |
| Estimated FX cost | ${estimatedCost.toFixed(2)} |

### Educational note
This is a deterministic educational estimate and not a live market quote.`);
    }
  );
}
