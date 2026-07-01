import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerRecommendPayfacModel(server: McpServer) {
  server.tool(
    "recommend_payfac_model",
    "Recommend a PayFac operating model for a platform-led merchant setup.",
    {
      business_model: z.string().default("ISV")
    },
    async ({ business_model }) => {
      return text(`## PayFac Model Recommendation

### Recommended approach
- Use a platform-led merchant onboarding and underwriting model
- Own the seller relationship with clear risk and payout operations
- Keep reserves and monitoring controls explicit

### Best fit for ${business_model}
- Strong when the platform wants direct merchant control and higher responsibility.

### Educational note
This is a deterministic educational PayFac model recommendation.`);
    }
  );
}
