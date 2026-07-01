import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerCompareTraditionalVsStablecoin(server: McpServer) {
  server.tool(
    "compare_traditional_vs_stablecoin",
    "Compare traditional settlement with stablecoin settlement in a deterministic way.",
    {
      settlement_preference: z.enum(["Traditional", "Stablecoin", "Hybrid"]).default("Hybrid")
    },
    async ({ settlement_preference }) => {
      return text(`## Traditional vs Stablecoin Comparison

| Dimension | Traditional | Stablecoin |
| --- | --- | --- |
| Speed | Slower bank-dependent settlement | Faster network-based settlement |
| Cost | Depends on rails and FX | Can reduce some banking friction |
| Liquidity | Requires treasury buffers | Requires wallet and liquidity management |
| Treasury | Familiar reconciliation | Needs custody and liquidity controls |
| Compliance | Mature controls | Requires digital asset controls |

### Educational recommendation
For a ${settlement_preference.toLowerCase()} strategy, the architectural tradeoffs should be reviewed with treasury, legal, and operations stakeholders.`);
    }
  );
}
