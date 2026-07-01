import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerDesignPaymentFlow(server: McpServer) {
  server.tool(
    "design_payment_flow",
    "Generate an educational payment flow diagram and narrative.",
    {
      business_model: z.string().default("Marketplace")
    },
    async ({ business_model }) => {
      return text(`## Payment Flow Diagram

### ASCII diagram
Customer
    |
AI Agent
    |
Merchant
    |
PSP
    |
Acquirer
    |
Settlement
    |
Treasury

### Mermaid diagram
\`\`\`mermaid
flowchart LR
Customer-->Agent
Agent-->Merchant
Merchant-->PSP
PSP-->Acquirer
Acquirer-->Settlement
Settlement-->Treasury
\`\`\`

### Educational note
This is a deterministic payment flow diagram for ${business_model} architecture discussions.`);
    }
  );
}
