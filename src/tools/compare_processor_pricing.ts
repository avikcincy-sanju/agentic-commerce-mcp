import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { estimateProcessorPricing } from "../calculators/estimates.js";

export function registerCompareProcessorPricing(server: McpServer) {
  server.tool(
    "compare_processor_pricing",
    "Estimate simplified processing economics for several payment providers.",
    {
      annual_volume: z.number(),
      average_ticket: z.number()
    },
    async ({ annual_volume, average_ticket }) => {
      const rows = estimateProcessorPricing(annual_volume, average_ticket)
        .map((item) => `| ${item.name} | ${item.processingPercent * 100}% | ${item.fixedFee.toFixed(2)} | ${item.estimatedAnnualProcessingCost.toFixed(2)} |`)
        .join("\n");

      return text(`## Processor Pricing Comparison

| Provider | Processing % | Fixed fee | Estimated annual processing cost |
| --- | ---: | ---: | ---: |
${rows}

### Educational note
These figures are simplified estimates for education only and should not be treated as vendor quotes.`);
    }
  );
}
