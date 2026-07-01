import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerDesignSolutionArchitecture(server: McpServer) {
  server.tool(
    "design_solution_architecture",
    "Generate an educational solution architecture diagram and narrative.",
    {
      business_model: z.string().default("Marketplace")
    },
    async ({ business_model }) => {
      return text(`## Solution Architecture

### ASCII diagram
Customer
    |
AI Agent
    |
Merchant
    |
Stripe
    |
Treasury
    |
ERP

### Mermaid diagram
\`\`\`mermaid
flowchart LR
Customer-->Agent
Agent-->Merchant
Merchant-->Stripe
Stripe-->Treasury
Treasury-->ERP
\`\`\`

### Educational note
This is a deterministic architectural diagram for ${business_model} design discussions.`);
    }
  );
}
