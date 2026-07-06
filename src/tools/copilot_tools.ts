import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { buildArchitectureCopilotReport } from "../copilot/engine.js";
import { text } from "../utils/text.js";

export function registerCopilotTools(server: McpServer) {
  server.tool(
    "architecture_copilot",
    "Produce a deterministic architecture copilot report for a business scenario.",
    { scenario: z.string().default("A marketplace wants to launch in multiple countries"), domain: z.string().default("marketplace") },
    async ({ scenario, domain }) => {
      const result = buildArchitectureCopilotReport({ scenario, domain });
      return text(`## Architecture Copilot\n\n${result.markdown}\n\n### Mermaid\n\n\`\`\`mermaid\n${result.mermaid}\n\`\`\`\n\n### PlantUML\n\n\`\`\`plantuml\n${result.plantuml}\n\`\`\``);
    }
  );

  server.tool("design_platform_copilot", "Design a deterministic platform architecture.", { scenario: z.string().default("ISV") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "platform" });
    return text(result.markdown);
  });

  server.tool("design_marketplace_copilot", "Design a deterministic marketplace architecture.", { scenario: z.string().default("Marketplace") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "marketplace" });
    return text(result.markdown);
  });

  server.tool("design_payfac_copilot", "Design a deterministic PayFac architecture.", { scenario: z.string().default("PayFac") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "payfac" });
    return text(result.markdown);
  });

  server.tool("design_embedded_finance_copilot", "Design a deterministic embedded-finance architecture.", { scenario: z.string().default("Embedded finance") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "embedded-finance" });
    return text(result.markdown);
  });

  server.tool("design_crossborder_copilot", "Design a deterministic cross-border architecture.", { scenario: z.string().default("Cross-border") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "crossborder" });
    return text(result.markdown);
  });

  server.tool("design_agentic_commerce_copilot", "Design a deterministic agentic commerce architecture.", { scenario: z.string().default("Agentic commerce") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "agentic-commerce" });
    return text(result.markdown);
  });

  server.tool("design_stablecoin_platform_copilot", "Design a deterministic stablecoin platform architecture.", { scenario: z.string().default("Stablecoin") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "stablecoin" });
    return text(result.markdown);
  });

  server.tool("design_treasury_copilot", "Design a deterministic treasury architecture.", { scenario: z.string().default("Treasury") }, async ({ scenario }) => {
    const result = buildArchitectureCopilotReport({ scenario, domain: "treasury" });
    return text(result.markdown);
  });
}
