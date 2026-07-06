export interface CopilotReportInput {
  scenario: string;
  domain: string;
}

export interface CopilotReportOutput {
  markdown: string;
  mermaid: string;
  plantuml: string;
}

export function buildArchitectureCopilotReport(input: CopilotReportInput): CopilotReportOutput {
  const markdown = [
    "# Agentic Commerce Architecture Copilot",
    "",
    "## Executive Summary",
    `The proposed ${input.domain} architecture for ${input.scenario} is designed to be deterministic, offline, and educational.`,
    "",
    "## Business Context",
    "A platform-led operating model is preferred for multi-country launch and control over risk and settlement.",
    "",
    "## Architecture Recommendation",
    "Use a modular orchestration layer with a PSP abstraction, treasury controls, and a stablecoin-ready settlement path.",
    "",
    "## Decision Tree",
    "- Marketplace? YES",
    "- Own merchant? YES -> Platform PayFac",
    "- Own merchant? NO -> Marketplace MOR",
    "",
    "## Vendor Comparison",
    "- Stripe: strong developer experience",
    "- Adyen: strong global coverage",
    "- BVNK: strong stablecoin readiness",
    "",
    "## Architecture Score",
    "- Stripe: 92/100",
    "- Adyen: 88/100",
    "",
    "## Payment Flow",
    "Buyer -> Checkout -> PSP -> Settlement -> Treasury",
    "",
    "## Settlement Flow",
    "Settlement -> Reserve -> Treasury -> Reconciliation",
    "",
    "## Treasury Flow",
    "Collections -> Float Management -> Payouts",
    "",
    "## Merchant Onboarding",
    "Document collection -> KYC -> Underwriting -> Enablement",
    "",
    "## Compliance",
    "KYC, sanctions screening, transaction monitoring, and audit logging",
    "",
    "## Risk Assessment",
    "Control risk through reserve, failover, and dispute management",
    "",
    "## Implementation Roadmap",
    "1. Define platform boundaries",
    "2. Implement PSP abstraction",
    "3. Introduce treasury controls",
    "4. Add stablecoin path",
    "",
    "## Future Enhancements",
    "Add connector adapters, reporting, and richer simulation models"
  ].join("\n");

  const mermaid = [
    "flowchart TD",
    "A[Scenario] --> B[Architecture Recommendation]",
    "B --> C[Vendor Comparison]",
    "B --> D[Settlement Flow]"
  ].join("\n");

  const plantuml = [
    "@startuml",
    "component " + input.domain + "",
    "rectangle " + input.scenario,
    "@enduml"
  ].join("\n");

  return { markdown, mermaid, plantuml };
}
