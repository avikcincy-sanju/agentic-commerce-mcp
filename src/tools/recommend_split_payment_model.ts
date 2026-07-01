import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerRecommendSplitPaymentModel(server: McpServer) {
  server.tool(
    "recommend_split_payment_model",
    "Recommend a split payment model for a marketplace or platform.",
    {
      business_model: z.string().default("Marketplace")
    },
    async ({ business_model }) => {
      return text(`## Split Payment Model Recommendation

### Recommended approach
1. Capture gross transaction amount
2. Apply platform fee and seller payout logic
3. Route net proceeds to sellers
4. Reconcile fees and settlement outcomes

### Best fit for ${business_model}
- A clear fee schedule and settlement ledger are essential for trustworthy payouts.

### Educational note
This is a deterministic educational split payment model recommendation.`);
    }
  );
}
