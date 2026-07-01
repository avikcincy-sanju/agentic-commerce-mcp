import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerDesignTreasuryFlow(server: McpServer) {
  server.tool(
    "design_treasury_flow",
    "Generate an educational treasury flow diagram and narrative.",
    {
      business_model: z.string().default("Marketplace")
    },
    async ({ business_model }) => {
      return text(`## Treasury Flow Diagram

### ASCII diagram
Settlement
    |
Treasury
    |
Reserve
    |
Payout Engine
    |
ERP

### Mermaid diagram
\`\`\`mermaid
flowchart LR
Settlement-->Treasury
Treasury-->Reserve
Reserve-->PayoutEngine
PayoutEngine-->ERP
\`\`\`

### Educational note
This is a deterministic treasury flow diagram for ${business_model} architecture discussions.`);
    }
  );
}
