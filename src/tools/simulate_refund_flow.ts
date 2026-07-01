import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerSimulateRefundFlow(server: McpServer) {
  server.tool(
    "simulate_refund_flow",
    "Simulate a refund lifecycle for a payment.",
    {
      settlement: z.enum(["Traditional", "USDC"]).default("Traditional")
    },
    async ({ settlement }) => {
      return text(`## Refund Flow Simulation

Customer → Merchant → PSP → Refund Ledger → Settlement Reversal → Treasury → ERP

### Flow
1. A refund request is initiated.
2. The merchant confirms the refund amount.
3. The PSP processes the refund instruction.
4. The settlement layer creates a reversal or refund event.
5. Treasury and ERP reflect the adjusted balance.

### Educational note
This is a deterministic educational simulation for refund handling.`);
    }
  );
}
