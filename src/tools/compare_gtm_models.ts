import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerCompareGtmModels(server: McpServer) {
  server.tool(
    "compare_gtm_models",
    "Explain how GTM models map to channel ownership models.",
    {
      model: z
        .enum([
          "Platform PayFac",
          "PayFac-as-a-Service",
          "Embedded Finance",
          "ISO Gateway",
          "Agentic Gateway",
          "Marketplace",
          "Platform MOR",
          "All"
        ])
        .default("All")
    },
    async ({ model }) => {
      const all = `## GTM Model Comparison

| Model | Channel | Main idea | Risk note |
| --- | --- | --- | --- |
| Platform PayFac | ISV | The platform owns the seller relationship end to end | Highest operating burden |
| PayFac-as-a-Service | ISV | The platform controls the experience while infrastructure is delegated | Less direct regulatory burden |
| Embedded Finance | ISV | Payments expand into accounts, cards, or working capital | More product and compliance complexity |
| ISO Gateway | ISO | Existing merchant relationships become agent-accessible | Depends on sponsor relationships |
| Agentic Gateway | ISO | Agent-driven access is layered over merchant routing | Needs strong routing semantics |
| Marketplace | Marketplace/MOR | The platform orchestrates checkout and payout | Seller operations can become complex |
| Platform MOR | Marketplace/MOR | The platform acts as merchant of record for the transaction | Higher treasury responsibility |
`;

      return text(model === "All" ? all : `## ${model}\n\n${all}`);
    }
  );
}
