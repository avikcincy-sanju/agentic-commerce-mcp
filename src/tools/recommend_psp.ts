import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { recommendPsp } from "../advisors/recommendations.js";

export function registerRecommendPsp(server: McpServer) {
  server.tool(
    "recommend_psp",
    "Recommend a PSP or payments provider for a given market profile.",
    {
      region: z.string().default("Global"),
      merchant_size: z.string().default("Growth"),
      business_model: z.string().default("Digital")
    },
    async ({ region, merchant_size, business_model }) => {
      const recommendations = recommendPsp(region, merchant_size, business_model);
      const rows = recommendations.map((item) => `| ${item.name} | ${item.why} |`).join("\n");

      return text(`## PSP Recommendation

| Provider | Why it fits |
| --- | --- |
${rows}

### Educational note
This is a static recommendation based on simplified educational knowledge and not a live vendor recommendation.`);
    }
  );
}
