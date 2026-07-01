import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { architectureDecisionEngine } from "../advisors/recommendations.js";

export function registerArchitectureDecisionEngine(server: McpServer) {
  server.tool(
    "architecture_decision_engine",
    "Recommend a payments architecture based on business context.",
    {
      business_model: z.string().default("Marketplace"),
      country: z.string().default("UnitedStates"),
      expected_gmv: z.number().default(10000000),
      settlement_preference: z.string().default("Traditional"),
      merchant_ownership: z.string().default("Platform-owned")
    },
    async ({ business_model, country, expected_gmv, settlement_preference, merchant_ownership }) => {
      const recommendation = architectureDecisionEngine({
        businessModel: business_model,
        country,
        expectedGmv: expected_gmv,
        settlementPreference: settlement_preference,
        merchantOwnership: merchant_ownership
      });

      return text(`## Architecture Decision Engine

| Area | Recommendation |
| --- | --- |
| PSP | ${recommendation.psp} |
| GTM | ${recommendation.gtm} |
| Settlement | ${recommendation.settlement} |
| Treasury | ${recommendation.treasury} |
| Merchant model | ${recommendation.merchantModel} |
| Payment methods | ${recommendation.paymentMethods.join(", ")} |
| Risk considerations | ${recommendation.risks.join(", ")} |

### Architecture summary
${recommendation.architectureSummary}

### Educational note
This is a structured educational recommendation for architecture planning.`);
    }
  );
}
