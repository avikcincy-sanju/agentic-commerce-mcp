import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerRecommendMarketplaceModel(server: McpServer) {
  server.tool(
    "recommend_marketplace_model",
    "Recommend a marketplace operating model for a given commerce context.",
    {
      business_model: z.string().default("Marketplace")
    },
    async ({ business_model }) => {
      return text(`## Marketplace Model Recommendation

### Recommended approach
- Use a platform-led checkout with seller routing and payout controls
- Keep a clear duty separation between marketplace, seller, and treasury operations
- Use a dedicated reconciliation and reserve process

### Best fit for ${business_model}
- Strong for multi-seller, high-volume, and platform-led commerce.

### Educational note
This is a deterministic educational marketplace model recommendation.`);
    }
  );
}
