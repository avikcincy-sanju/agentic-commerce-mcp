import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerRecommendKycFlow(server: McpServer) {
  server.tool(
    "recommend_kyc_flow",
    "Recommend a simplified KYC workflow for a merchant onboarding scenario.",
    {
      merchant_type: z.string().default("Marketplace")
    },
    async ({ merchant_type }) => {
      return text(`## KYC Flow Recommendation

### Recommended steps
1. Collect business identity and ownership details
2. Verify beneficial owners
3. Review tax and operational context
4. Apply risk scoring and sanctions checks
5. Approve or route for manual review

### Best fit for ${merchant_type}
- Use a stepwise process to support onboarding scale and exception handling.

### Educational note
This is a deterministic educational KYC recommendation.`);
    }
  );
}
