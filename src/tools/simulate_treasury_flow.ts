import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerSimulateTreasuryFlow(server: McpServer) {
  server.tool(
    "simulate_treasury_flow",
    "Simulate how funds move through a treasury flow for an agentic commerce scenario.",
    {
      channel: z.enum(["ISV", "ISO", "Marketplace/MOR"]).default("ISV"),
      settlement: z.enum(["Traditional", "USDC"]).default("Traditional"),
      payout_timing: z.enum(["Same day", "T+1", "T+2", "Weekly"]).default("T+1")
    },
    async ({ channel, settlement, payout_timing }) => {
      let flow = "";

      if (channel === "Marketplace/MOR") {
        flow = "The buyer pays through the marketplace checkout, the platform receives the funds, and the seller is paid later through a payout step managed by the platform.";
      } else if (channel === "ISO") {
        flow = "The buyer pays through an agent-enabled merchant route, funds are collected by the merchant relationship owner, and the ISO or its downstream partner handles the payout to the merchant.";
      } else {
        flow = "The buyer pays through the ISV-enabled merchant relationship, funds are captured and routed through the ISV's merchant flow, and the seller receives a payout from the platform-led settlement layer.";
      }

      const settlementRisk = settlement === "USDC"
        ? "Settlement risk shifts toward wallet custody, chain confirmation, and conversion or on-ramp steps if the seller needs local funds."
        : "Settlement risk remains concentrated in bank timing, reconciliation, reserve balances, chargebacks, and delayed payout exposure.";

      return text(`## Simulated Treasury Flow

| Dimension | Value |
| --- | --- |
| Channel | ${channel} |
| Settlement | ${settlement} |
| Payout timing | ${payout_timing} |

### How funds move
1. The buyer authorizes a payment through the selected channel.
2. The payment is captured and routed through the chosen settlement rail.
3. ${flow}
4. The platform or seller receives funds according to the selected payout timing.

### Where settlement risk exists
- Authorization and chargeback exposure
- Timing mismatch between capture and payout
- Reserve or liquidity pressure if the platform holds funds temporarily
- ${settlementRisk}

### Treasury controls that matter
- Reserve balances and payout limits
- Daily reconciliation and exception monitoring
- Fraud and chargeback controls
- Approval thresholds for manual payouts
- Clear rules for FX, conversion, and liquidity planning

### Educational note
This is a static simulation for architecture education and not a live payment workflow.`);
    }
  );
}
