import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerSimulateEmbeddedFinance(server: McpServer) {
  server.tool(
    "simulate_embedded_finance",
    "Simulate an embedded finance flow that combines payments and financing.",
    {
      product: z.string().default("Working capital")
    },
    async ({ product }) => {
      return text(`## Embedded Finance Simulation

Customer → AI Agent → Merchant Endpoint → Payments → Financing Decision → Treasury → ERP

### Flow
1. The customer initiates a purchase through an embedded experience.
2. The platform decides whether the transaction should use standard payment acceptance or a financing product.
3. The payment is authorized and the financing ledger is updated.
4. treasury and accounting reflect the new obligations.

### Educational note
This is a deterministic educational simulation for embedded finance architecture.`);
    }
  );
}
