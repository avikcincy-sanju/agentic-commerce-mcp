import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { buildDecisionTree } from "../decision-engine/engine.js";
import { text } from "../utils/text.js";

export function registerDecisionTreeTools(server: McpServer) {
  server.tool(
    "generate_decision_tree",
    "Generate a deterministic ASCII, Mermaid, and PlantUML decision tree.",
    {
      title: z.string().default("Decision Tree"),
      question: z.string().default("Marketplace?"),
      yesLabel: z.string().default("YES"),
      noLabel: z.string().default("NO")
    },
    async ({ title, question, yesLabel, noLabel }) => {
      const result = buildDecisionTree({
        title,
        question,
        yesLabel,
        noLabel,
        yesBranch: [{ label: "Own merchant?", result: "Platform PayFac" }],
        noBranch: [{ label: "Marketplace?", result: "Marketplace MOR" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}\n\n### Mermaid\n\n\`\`\`mermaid\n${result.mermaid}\n\`\`\`\n\n### PlantUML\n\n\`\`\`plantuml\n${result.plantuml}\n\`\`\``);
    }
  );

  server.tool(
    "generate_checkout_decision",
    "Generate a deterministic checkout decision tree.",
    {
      title: z.string().default("Checkout Decision")
    },
    async ({ title }) => {
      const result = buildDecisionTree({
        title,
        question: "Checkout complexity?",
        yesLabel: "High complexity",
        noLabel: "Low complexity",
        yesBranch: [{ label: "Use orchestration", result: "Platform PayFac" }],
        noBranch: [{ label: "Use direct PSP", result: "Embedded Checkout" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}`);
    }
  );

  server.tool(
    "generate_psp_selection_tree",
    "Generate a deterministic PSP selection decision tree.",
    {
      title: z.string().default("PSP Selection")
    },
    async ({ title }) => {
      const result = buildDecisionTree({
        title,
        question: "Need global coverage?",
        yesLabel: "YES",
        noLabel: "NO",
        yesBranch: [{ label: "Use Adyen or Checkout.com", result: "Global PSP" }],
        noBranch: [{ label: "Use Stripe", result: "Domestic PSP" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}`);
    }
  );

  server.tool(
    "generate_mor_decision",
    "Generate a deterministic MOR decision tree.",
    {
      title: z.string().default("MOR Decision")
    },
    async ({ title }) => {
      const result = buildDecisionTree({
        title,
        question: "Marketplace ownership?",
        yesLabel: "YES",
        noLabel: "NO",
        yesBranch: [{ label: "Own merchant", result: "Platform PayFac" }],
        noBranch: [{ label: "No merchant ownership", result: "Marketplace MOR" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}`);
    }
  );

  server.tool(
    "generate_payfac_decision",
    "Generate a deterministic PayFac decision tree.",
    {
      title: z.string().default("PayFac Decision")
    },
    async ({ title }) => {
      const result = buildDecisionTree({
        title,
        question: "Need underwriting?",
        yesLabel: "YES",
        noLabel: "NO",
        yesBranch: [{ label: "Use PayFac model", result: "PayFac" }],
        noBranch: [{ label: "Use ISO model", result: "ISO" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}`);
    }
  );

  server.tool(
    "generate_settlement_decision",
    "Generate a deterministic settlement decision tree.",
    {
      title: z.string().default("Settlement Decision")
    },
    async ({ title }) => {
      const result = buildDecisionTree({
        title,
        question: "Need instant settlement?",
        yesLabel: "YES",
        noLabel: "NO",
        yesBranch: [{ label: "Use stablecoin rail", result: "USDC" }],
        noBranch: [{ label: "Use traditional rails", result: "Traditional" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}`);
    }
  );

  server.tool(
    "generate_marketplace_decision",
    "Generate a deterministic marketplace decision tree.",
    {
      title: z.string().default("Marketplace Decision")
    },
    async ({ title }) => {
      const result = buildDecisionTree({
        title,
        question: "Marketplace?",
        yesLabel: "YES",
        noLabel: "NO",
        yesBranch: [{ label: "Own merchant?", result: "Platform PayFac" }],
        noBranch: [{ label: "No merchant ownership", result: "Marketplace MOR" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}`);
    }
  );

  server.tool(
    "generate_crossborder_decision",
    "Generate a deterministic cross-border decision tree.",
    {
      title: z.string().default("Cross-border Decision")
    },
    async ({ title }) => {
      const result = buildDecisionTree({
        title,
        question: "Need cross-border?",
        yesLabel: "YES",
        noLabel: "NO",
        yesBranch: [{ label: "Use multi-currency rails", result: "Cross-border" }],
        noBranch: [{ label: "Use domestic rails", result: "Domestic" }]
      });
      return text(`## ${result.title}\n\n${result.ascii}`);
    }
  );
}
