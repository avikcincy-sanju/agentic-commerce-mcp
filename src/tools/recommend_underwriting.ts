import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerRecommendUnderwriting(server: McpServer) {
  server.tool(
    "recommend_underwriting",
    "Recommend a simplified underwriting approach for merchant onboarding.",
    {
      merchant_type: z.string().default("Marketplace")
    },
    async ({ merchant_type }) => {
      return text(`## Underwriting Recommendation

### Recommended approach
- Review transaction profile and expected volume
- Assess risk and payout exposure
- Define reserve and approval thresholds
- Set escalation rules for unusual growth

### Best fit for ${merchant_type}
- A layered approach is more suitable than a single-stage decision.

### Educational note
This is a deterministic educational underwriting recommendation.`);
    }
  );
}
