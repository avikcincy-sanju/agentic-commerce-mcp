import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { vendorKnowledge } from "../knowledge/payments.js";

export function registerCompareProcessors(server: McpServer) {
  server.tool(
    "compare_processors",
    "Compare processor positioning and educational cost fit.",
    {
      vendor1: z.string().default("Stripe"),
      vendor2: z.string().default("Adyen")
    },
    async ({ vendor1, vendor2 }) => {
      const left = vendorKnowledge[vendor1] ?? vendorKnowledge.Stripe;
      const right = vendorKnowledge[vendor2] ?? vendorKnowledge.Adyen;

      return text(`## Processor Comparison

| Capability | ${left.name} | ${right.name} |
| --- | --- | --- |
| Strengths | ${left.strengths.join(", ")} | ${right.strengths.join(", ")} |
| Marketplace support | ${left.marketplaceSupport} | ${right.marketplaceSupport} |
| Treasury | ${left.treasury} | ${right.treasury} |
| FX | ${left.fx} | ${right.fx} |
| Cross-border | ${left.crossBorder} | ${right.crossBorder} |
| Embedded finance | ${left.embeddedFinance} | ${right.embeddedFinance} |

### Educational note
This is a deterministic vendor comparison guide for architecture discussions.`);
    }
  );
}
