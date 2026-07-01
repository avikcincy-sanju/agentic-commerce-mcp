import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerCompareChannels(server: McpServer) {
  server.tool(
    "compare_channels",
    "Compare ISV, ISO, and Marketplace/MOR channel models in agentic commerce.",
    {
      channel: z.enum(["ISV", "ISO", "Marketplace/MOR", "All"]).default("All")
    },
    async ({ channel }) => {
      const all = `## Channel Comparison

| Channel | Core ownership | Best fit | Key strength |
| --- | --- | --- | --- |
| ISV | Owns the seller relationship | Platform PayFac and embedded finance | Highest control over merchant experience |
| ISO | Owns access and routing | Existing merchant portfolios | Low-disruption enablement |
| Marketplace/MOR | Owns the customer transaction and payout flow | Marketplaces and platform MOR | Strong checkout and seller orchestration |

### Notes
- ISV: Owns the merchant graph and can embed payments and financial services.
- ISO: Leverages existing merchant portfolios and adds an agentic routing layer.
- Marketplace/MOR: Controls discovery, checkout, and payout orchestration.`;

      return text(channel === "All" ? all : `## ${channel}\n\n${all}`);
    }
  );
}
