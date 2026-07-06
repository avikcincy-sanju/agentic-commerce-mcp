import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { simulatePaymentScenario } from "../simulator-engine/engine.js";
import { text } from "../utils/text.js";

export function registerSimulatorTools(server: McpServer) {
  server.tool(
    "simulate_payment_network",
    "Simulate a deterministic payment network scenario.",
    {
      transactionVolume: z.number().default(100000),
      countries: z.number().default(3),
      currencies: z.number().default(2),
      gmv: z.number().default(5000000),
      settlementRail: z.string().default("Domestic Traditional"),
      psp: z.string().default("Stripe"),
      marketplaceModel: z.string().default("Marketplace"),
      merchantOwnership: z.string().default("Platform")
    },
    async (input) => {
      const result = simulatePaymentScenario(input);
      return text(`## Payment Network Simulation\n\n- Authorization rate: ${result.authorizationRate}%\n- Settlement time: ${result.settlementTime} day(s)\n- Treasury float: ${result.treasuryFloat}\n- Reserve estimate: ${result.reserveEstimate}\n- FX costs: ${result.fxCosts}\n- Processing costs: ${result.processingCosts}\n- Revenue: ${result.revenue}\n- Payout timing: ${result.payoutTiming} day(s)\n- Operational complexity: ${result.operationalComplexity}\n- Risk score: ${result.riskScore}`);
    }
  );

  server.tool("simulate_checkout", "Simulate a deterministic checkout flow.", { transactionVolume: z.number().default(100000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 1, currencies: 1, gmv: 1000000, settlementRail: "Domestic Traditional", psp: "Stripe", marketplaceModel: "Direct", merchantOwnership: "Merchant" });
    return text(`## Checkout Simulation\n\nAuthorization rate: ${result.authorizationRate}%`);
  });

  server.tool("simulate_marketplace_flow", "Simulate a deterministic marketplace payment flow.", { transactionVolume: z.number().default(250000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 2, currencies: 2, gmv: 2000000, settlementRail: "Cross-border Traditional", psp: "Adyen", marketplaceModel: "Marketplace", merchantOwnership: "Platform" });
    return text(`## Marketplace Simulation\n\nSettlement time: ${result.settlementTime} day(s)`);
  });

  server.tool("simulate_settlement", "Simulate a deterministic settlement flow.", { transactionVolume: z.number().default(100000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 2, currencies: 1, gmv: 1500000, settlementRail: "Domestic Traditional", psp: "Checkout.com", marketplaceModel: "Direct", merchantOwnership: "Merchant" });
    return text(`## Settlement Simulation\n\nTreasury float: ${result.treasuryFloat}`);
  });

  server.tool("simulate_refunds_flow", "Simulate a deterministic refund flow.", { transactionVolume: z.number().default(10000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 1, currencies: 1, gmv: 250000, settlementRail: "Domestic Traditional", psp: "Stripe", marketplaceModel: "Direct", merchantOwnership: "Merchant" });
    return text(`## Refund Simulation\n\nRisk score: ${result.riskScore}`);
  });

  server.tool("simulate_chargebacks", "Simulate a deterministic chargeback flow.", { transactionVolume: z.number().default(10000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 2, currencies: 2, gmv: 300000, settlementRail: "Cross-border Traditional", psp: "Adyen", marketplaceModel: "Direct", merchantOwnership: "Merchant" });
    return text(`## Chargeback Simulation\n\nRisk score: ${result.riskScore}`);
  });

  server.tool("simulate_crossborder_flow", "Simulate a deterministic cross-border payment flow.", { transactionVolume: z.number().default(50000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 3, currencies: 3, gmv: 4000000, settlementRail: "Cross-border USDC", psp: "Airwallex", marketplaceModel: "Marketplace", merchantOwnership: "Platform" });
    return text(`## Cross-border Simulation\n\nFX costs: ${result.fxCosts}`);
  });

  server.tool("simulate_stablecoin", "Simulate a deterministic stablecoin settlement flow.", { transactionVolume: z.number().default(50000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 2, currencies: 2, gmv: 1500000, settlementRail: "Cross-border USDC", psp: "BVNK", marketplaceModel: "Marketplace", merchantOwnership: "Platform" });
    return text(`## Stablecoin Simulation\n\nSettlement time: ${result.settlementTime} day(s)`);
  });

  server.tool("simulate_fx", "Simulate a deterministic FX flow.", { transactionVolume: z.number().default(50000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 2, currencies: 2, gmv: 800000, settlementRail: "Cross-border Traditional", psp: "Airwallex", marketplaceModel: "Marketplace", merchantOwnership: "Platform" });
    return text(`## FX Simulation\n\nFX costs: ${result.fxCosts}`);
  });

  server.tool("simulate_multi_psp", "Simulate a deterministic multi-PSP flow.", { transactionVolume: z.number().default(200000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 4, currencies: 2, gmv: 6000000, settlementRail: "Domestic Traditional", psp: "Stripe", marketplaceModel: "Marketplace", merchantOwnership: "Platform" });
    return text(`## Multi-PSP Simulation\n\nOperational complexity: ${result.operationalComplexity}`);
  });

  server.tool("simulate_failover", "Simulate a deterministic failover flow.", { transactionVolume: z.number().default(100000) }, async (input) => {
    const result = simulatePaymentScenario({ ...input, countries: 3, currencies: 2, gmv: 3500000, settlementRail: "Domestic Traditional", psp: "Adyen", marketplaceModel: "Marketplace", merchantOwnership: "Platform" });
    return text(`## Failover Simulation\n\nRisk score: ${result.riskScore}`);
  });
}
