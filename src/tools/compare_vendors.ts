import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { vendorKnowledge } from "../knowledge/payments.js";

export function registerCompareVendors(server: McpServer) {
  server.tool(
    "compare_vendors",
    "Compare two payment vendors using static educational knowledge.",
    {
      vendor1: z.string().default("Stripe"),
      vendor2: z.string().default("Adyen")
    },
    async ({ vendor1, vendor2 }) => {
      const left = vendorKnowledge[vendor1] ?? vendorKnowledge.Stripe;
      const right = vendorKnowledge[vendor2] ?? vendorKnowledge.Adyen;

      return text(`## Vendor Comparison

| Capability | ${left.name} | ${right.name} |
| --- | --- | --- |
| Marketplace support | ${left.marketplaceSupport} | ${right.marketplaceSupport} |
| Treasury | ${left.treasury} | ${right.treasury} |
| FX | ${left.fx} | ${right.fx} |
| Cross-border | ${left.crossBorder} | ${right.crossBorder} |
| Embedded Finance | ${left.embeddedFinance} | ${right.embeddedFinance} |
| Stablecoins | ${left.stablecoins} | ${right.stablecoins} |
| Merchant onboarding | ${left.onboarding} | ${right.onboarding} |
| Reporting | ${left.reporting} | ${right.reporting} |
| Risk | ${left.risk} | ${right.risk} |
| Settlement | ${left.settlement} | ${right.settlement} |

### Educational note
This is a static educational comparison and not a substitute for vendor diligence.`);
    }
  );
}
