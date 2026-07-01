import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerExplainMerchantEndpoint(server: McpServer) {
  server.tool(
    "explain_merchant_endpoint",
    "Explain the merchant endpoint concept in agent-driven commerce.",
    {},
    async () => {
      return text(`## Merchant Endpoint

The merchant endpoint is the agent-accessible interface through which AI agents discover, select, transact, and confirm merchants.

### Traditional path
Search → Website → Checkout form → Card entry

### Agentic path
Buyer intent → AI agent → Merchant endpoint → Authorization → Settlement → Confirmation

### Why it matters
The platform that becomes the merchant endpoint can influence discovery, routing, payment initiation, settlement choice, and seller economics.

### Channel view
- ISV: exposes the ISV's sub-merchant graph
- ISO: routes into existing merchant portfolios
- Marketplace/MOR: exposes the platform's catalogue and transaction flow`);
    }
  );
}
