import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { generateArchitectureDiagram } from "../simulators/flows.js";

export function registerGeneratePaymentArchitecture(server: McpServer) {
  server.tool(
    "generate_payment_architecture",
    "Generate a simple ASCII and Mermaid payment architecture diagram.",
    {
      merchant: z.string().default("Marketplace"),
      psp: z.string().default("Stripe"),
      model: z.string().default("Platform PayFac"),
      settlement: z.string().default("Traditional")
    },
    async ({ merchant, psp, model, settlement }) => {
      const diagram = generateArchitectureDiagram(merchant, psp, model, settlement);

      return text(`## Payment Architecture Diagram

### ASCII
\n\n${diagram.ascii}\n\n### Mermaid\n\n\`\`\`mermaid\n${diagram.mermaid}\n\`\`\``);
    }
  );
}
