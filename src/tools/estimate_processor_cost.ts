import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { estimateProcessorPricing } from "../calculators/estimates.js";

export function registerEstimateProcessorCost(server: McpServer) {
  server.tool(
    "estimate_processor_cost",
    "Estimate educational processing costs for a provider set.",
    {
      annual_volume: z.number().default(10000000),
      average_ticket: z.number().default(200)
    },
    async ({ annual_volume, average_ticket }) => {
      const rows = estimateProcessorPricing(annual_volume, average_ticket)
        .map((item) => `| ${item.name} | ${item.processingPercent * 100}% | ${item.fixedFee.toFixed(2)} | ${item.estimatedAnnualProcessingCost.toFixed(2)} |`)
        .join("\n");

      return text(`## Processor Cost Estimate

| Provider | Processing % | Fixed fee | Estimated annual processing cost |
| --- | ---: | ---: | ---: |
${rows}

### Educational note
These are simplified educational estimates only.`);
    }
  );
}
