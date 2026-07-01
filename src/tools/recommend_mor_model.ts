import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { recommendMorModel } from "../advisors/recommendations.js";

export function registerRecommendMorModel(server: McpServer) {
  server.tool(
    "recommend_mor_model",
    "Recommend a merchant of record model for a given business profile.",
    {
      business_type: z.enum(["ISV", "ISO", "Marketplace", "Enterprise"]).default("Marketplace"),
      countries: z.string().default("UnitedStates")
    },
    async ({ business_type, countries }) => {
      const recommendation = recommendMorModel(business_type, countries);

      return text(`## MOR Recommendation

| Model | Why it fits |
| --- | --- |
| ${recommendation.name} | ${recommendation.description} |

### Best fit
${recommendation.bestFor}

### Educational note
This is a simplified architectural recommendation for learning and planning.`);
    }
  );
}
