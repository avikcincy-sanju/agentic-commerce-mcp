import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerDesignPayfac(server: McpServer) {
  server.tool(
    "design_payfac",
    "Generate an educational PayFac architecture diagram and narrative.",
    {
      business_model: z.string().default("ISV")
    },
    async ({ business_model }) => {
      return text(`## PayFac Architecture Diagram

### ASCII diagram
Platform
    |
Merchant Onboarding
    |
Risk & Underwriting
    |
PSP
    |
Settlement
    |
Treasury

### Mermaid diagram
\`\`\`mermaid
flowchart LR
Platform-->Onboarding
Onboarding-->Risk
Risk-->PSP
PSP-->Settlement
Settlement-->Treasury
\`\`\`

### Educational note
This is a deterministic PayFac diagram for ${business_model} architecture discussions.`);
    }
  );
}
