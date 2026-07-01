import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { simulateMultiAgentMarketplaceFlow } from "../simulators/flows.js";

export function registerSimulateMultiAgentMarketplace(server: McpServer) {
  server.tool(
    "simulate_multi_agent_marketplace",
    "Explain how delegated authority and payment orchestration work in a multi-agent marketplace.",
    {
      buyers: z.number().default(1),
      sellers: z.number().default(1)
    },
    async ({ buyers, sellers }) => {
      const flow = simulateMultiAgentMarketplaceFlow(buyers, sellers);

      return text(`## Multi-Agent Marketplace Simulation

### Delegated authority
${flow.delegatedAuthority}

### Payment orchestration
${flow.paymentOrchestration}

### Risk
${flow.risk}

### Settlement
${flow.settlement}`);
    }
  );
}
