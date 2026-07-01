import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { recommendGtmModel } from "../advisors/recommendations.js";

export function registerRecommendGtmModel(server: McpServer) {
  server.tool(
    "recommend_gtm_model",
    "Recommend a GTM model for a chosen business type and ownership priority.",
    {
      business_type: z.enum(["ISV", "ISO", "Marketplace", "Enterprise"]).default("ISV"),
      ownership_priority: z.enum(["Control", "Speed", "Embedded Finance", "Marketplace"]).default("Control")
    },
    async ({ business_type, ownership_priority }) => {
      const recommendation = recommendGtmModel(business_type, ownership_priority);

      return text(`## GTM Recommendation

| Dimension | Recommendation |
| --- | --- |
| GTM model | ${recommendation.gtmModel} |
| Why | ${recommendation.why} |

### Advantages
- ${recommendation.advantages.join("\n- ")}

### Risks
- ${recommendation.risks.join("\n- ")}

### Educational note
This is a static advisory response for learning and architecture framing.`);
    }
  );
}
