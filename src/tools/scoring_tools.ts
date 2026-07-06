import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { scoreVendor } from "../scoring/engine.js";
import { text } from "../utils/text.js";

const defaultDimensions = {
  cost: 90,
  risk: 85,
  complexity: 80,
  scalability: 90,
  developerExperience: 85,
  globalCoverage: 80,
  settlementSpeed: 75,
  treasuryEfficiency: 70,
  stablecoinReadiness: 78,
  marketplaceReadiness: 82
};

export function registerScoringTools(server: McpServer) {
  server.tool(
    "score_architecture",
    "Score an architecture using deterministic weighted dimensions.",
    { vendor: z.string().default("Stripe") },
    async ({ vendor }) => {
      const result = scoreVendor({ vendor, dimensions: defaultDimensions });
      return text(`## ${result.vendor}\n\n${result.overallScore}/100\n\n### Radar-style table\n\n${result.radarTable}\n\n### Strengths\n\n- ${result.strengths.join("\n- ")}\n\n### Weaknesses\n\n- ${result.weaknesses.join("\n- ")}\n\n### Recommendations\n\n- ${result.recommendations.join("\n- ")}`);
    }
  );

  server.tool("score_vendor", "Score a vendor deterministically.", { vendor: z.string().default("Stripe") }, async ({ vendor }) => {
    const result = scoreVendor({ vendor, dimensions: defaultDimensions });
    return text(`## ${result.vendor}\n\n${result.overallScore}/100`);
  });

  server.tool("score_psp", "Score a PSP deterministically.", { vendor: z.string().default("Stripe") }, async ({ vendor }) => {
    const result = scoreVendor({ vendor, dimensions: defaultDimensions });
    return text(`## ${result.vendor}\n\n${result.overallScore}/100`);
  });

  server.tool("score_treasury", "Score a treasury provider deterministically.", { vendor: z.string().default("Fireblocks") }, async ({ vendor }) => {
    const result = scoreVendor({ vendor, dimensions: { ...defaultDimensions, cost: 82, risk: 88, treasuryEfficiency: 92 } });
    return text(`## ${result.vendor}\n\n${result.overallScore}/100`);
  });

  server.tool("score_crossborder", "Score a cross-border provider deterministically.", { vendor: z.string().default("Airwallex") }, async ({ vendor }) => {
    const result = scoreVendor({ vendor, dimensions: { ...defaultDimensions, globalCoverage: 95, settlementSpeed: 90, cost: 80 } });
    return text(`## ${result.vendor}\n\n${result.overallScore}/100`);
  });

  server.tool("score_marketplace", "Score a marketplace architecture deterministically.", { vendor: z.string().default("Adyen") }, async ({ vendor }) => {
    const result = scoreVendor({ vendor, dimensions: { ...defaultDimensions, marketplaceReadiness: 95, scalability: 92 } });
    return text(`## ${result.vendor}\n\n${result.overallScore}/100`);
  });

  server.tool("score_payfac", "Score a PayFac architecture deterministically.", { vendor: z.string().default("Checkout.com") }, async ({ vendor }) => {
    const result = scoreVendor({ vendor, dimensions: { ...defaultDimensions, complexity: 70, risk: 80, marketplaceReadiness: 88 } });
    return text(`## ${result.vendor}\n\n${result.overallScore}/100`);
  });
}
