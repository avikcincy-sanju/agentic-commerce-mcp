import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerDesignMarketplace(server: McpServer) {
  server.tool(
    "design_marketplace",
    "Generate an educational marketplace architecture diagram and narrative.",
    {
      business_model: z.string().default("Marketplace")
    },
    async ({ business_model }) => {
      return text(`## Marketplace Architecture Diagram

### ASCII diagram
Customer
    |
Marketplace
   / \
Seller  Seller
    |
Treasury

### Mermaid diagram
\`\`\`mermaid
flowchart LR
Customer-->Marketplace
Marketplace-->Seller1
Marketplace-->Seller2
Marketplace-->Treasury
\`\`\`

### Educational note
This is a deterministic marketplace diagram for ${business_model} architecture discussions.`);
    }
  );
}
