import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { recommendTreasuryArchitecture } from "../advisors/architecture.js";

export function registerRecommendTreasuryArchitecture(server: McpServer) {
  server.tool(
    "recommend_treasury_architecture",
    "Recommend a treasury architecture based on scale and settlement posture.",
    {
      business_model: z.string().default("Marketplace"),
      merchant_ownership: z.string().default("Platform"),
      country: z.string().default("UnitedStates"),
      region: z.string().default("Domestic"),
      settlement_preference: z.string().default("Traditional"),
      scale: z.string().default("Growth"),
      gmv: z.number().default(10000000),
      transaction_volume: z.number().default(50000),
      cross_border_requirements: z.string().default("No"),
      marketplace: z.boolean().default(true),
      isv: z.boolean().default(false),
      platform: z.boolean().default(true),
      pay_fac: z.boolean().default(true),
      embedded_finance: z.boolean().default(false),
      stablecoin_preference: z.string().default("No")
    },
    async ({ business_model, merchant_ownership, country, region, settlement_preference, scale, gmv, transaction_volume, cross_border_requirements, marketplace, isv, platform, pay_fac, embedded_finance, stablecoin_preference }) => {
      const recommendation = recommendTreasuryArchitecture({
        businessModel: business_model,
        merchantOwnership: merchant_ownership,
        country,
        region,
        settlementPreference: settlement_preference,
        scale,
        gmv,
        transactionVolume: transaction_volume,
        crossBorderRequirements: cross_border_requirements,
        marketplace,
        isv,
        platform,
        payFac: pay_fac,
        embeddedFinance: embedded_finance,
        stablecoinPreference: stablecoin_preference
      });

      return text(`## Treasury Architecture Recommendation

| Area | Recommendation |
| --- | --- |
| Treasury architecture | ${recommendation.recommendedArchitecture} |
| Reasoning | ${recommendation.reasoning} |
| Implementation complexity | ${recommendation.implementationComplexity} |

### Pros
- ${recommendation.pros.join("\n- ")}

### Cons
- ${recommendation.cons.join("\n- ")}

### Risks
- ${recommendation.risks.join("\n- ")}

### Alternatives
- ${recommendation.alternatives.join("\n- ")}

### Educational note
This is a deterministic treasury recommendation for architecture planning.`);
    }
  );
}
