import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerCompareSettlementRails(server: McpServer) {
  server.tool(
    "compare_settlement_rails",
    "Compare traditional and stablecoin settlement rails.",
    {
      rail: z
        .enum(["Domestic Traditional", "Cross-border Traditional", "Domestic USDC", "Cross-border USDC", "All"])
        .default("All")
    },
    async ({ rail }) => {
      const all = `## Settlement Rail Comparison

| Rail | Characteristics | Best when |
| --- | --- | --- |
| Domestic Traditional | Bank rails and card settlement | You want a conventional domestic model |
| Cross-border Traditional | Local rails plus FX and banking steps | International settlement matters |
| Domestic USDC | On-chain stablecoin settlement | A wallet-based or programmable settlement story is attractive |
| Cross-border USDC | Stablecoin settlement across routes | You want to reduce friction in global flows |

### Key Insight
Card authorization and settlement can be separate layers. A buyer may use a card while the platform settles through a different rail.`;

      return text(rail === "All" ? all : `## ${rail}\n\n${all}`);
    }
  );
}
