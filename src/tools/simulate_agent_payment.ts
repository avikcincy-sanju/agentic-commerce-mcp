import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { simulateAgentPaymentFlow } from "../simulators/flows.js";

export function registerSimulateAgentPayment(server: McpServer) {
  server.tool(
    "simulate_agent_payment",
    "Simulate a step-by-step AI-initiated payment flow.",
    {
      channel: z.enum(["ISV", "ISO", "Marketplace/MOR"]).default("ISV"),
      payment_method: z.enum(["Visa", "Mastercard", "USDC Wallet", "Wallet"]).default("Visa"),
      settlement: z.enum(["Traditional", "USDC"]).default("Traditional")
    },
    async ({ channel, payment_method, settlement }) => {
      const steps = simulateAgentPaymentFlow(channel, payment_method, settlement);

      return text(`## Agent-Initiated Payment Simulation

### Flow
1. ${steps.join("\n2. ")}

### Educational note
This is a static educational simulation of how an AI agent could initiate a commerce payment flow.`);
    }
  );
}
