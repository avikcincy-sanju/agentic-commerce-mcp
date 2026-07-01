import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { simulateStablecoinSettlement } from "../simulators/flows.js";

export function registerSimulateStablecoinSettlement(server: McpServer) {
  server.tool(
    "simulate_stablecoin_settlement",
    "Compare traditional settlement with stablecoin-based settlement.",
    {
      currency: z.string().default("USD"),
      destination: z.string().default("Seller wallet")
    },
    async ({ currency, destination }) => {
      const simulation = simulateStablecoinSettlement(currency, destination);

      return text(`## Stablecoin Settlement Simulation

### Traditional flow
${simulation.traditionalFlow}

### Stablecoin flow
${simulation.stablecoinFlow}

### Benefits
- ${simulation.benefits.join("\n- ")}

### Risks
- ${simulation.risks.join("\n- ")}

### Educational note
This is a static, educational comparison and not an implementation guide for a live network.`);
    }
  );
}
