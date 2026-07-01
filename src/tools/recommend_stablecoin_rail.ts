import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerRecommendStablecoinRail(server: McpServer) {
  server.tool(
    "recommend_stablecoin_rail",
    "Recommend a stablecoin settlement approach based on a simple scenario.",
    {
      currency: z.string().default("USD"),
      destination: z.string().default("US"),
      preference: z.enum(["Speed", "Cost", "Liquidity", "Compliance"]).default("Speed")
    },
    async ({ currency, destination, preference }) => {
      const recommendation = preference === "Compliance"
        ? "Traditional rails with strong compliance controls"
        : preference === "Liquidity"
          ? "Stablecoin with clear reserve and custody governance"
          : "USDC-led settlement with a fallback to traditional rails";

      return text(`## Stablecoin Rail Recommendation

| Dimension | Recommendation |
| --- | --- |
| Currency | ${currency} |
| Destination | ${destination} |
| Preferred outcome | ${preference} |
| Recommended rail | ${recommendation} |

### Educational note
This is a deterministic educational recommendation and not a live market or compliance opinion.`);
    }
  );
}
