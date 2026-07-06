export interface ConsultingReportInput {
  scenario: string;
  vendor: string;
}

export function buildConsultingReport(input: ConsultingReportInput): string {
  return [
    "# Consulting Report",
    "",
    "## Executive Summary",
    `The ${input.vendor} architecture is a strong deterministic starting point for ${input.scenario}.`,
    "",
    "## Current State",
    "A platform-led payments architecture is emerging with an emphasis on predictable routing and control.",
    "",
    "## Target State",
    "Introduce modular payment, treasury, and stablecoin capabilities while preserving deterministic offline guidance.",
    "",
    "## Architecture",
    "Core services: checkout, PSP gateway, settlement, treasury, reporting.",
    "",
    "## Vendor Comparison",
    "Compare PSP, treasury, and stablecoin providers using consistent scoring dimensions.",
    "",
    "## Decision Tree",
    "Marketplace? YES -> Platform PayFac or Marketplace MOR",
    "",
    "## Architecture Score",
    "Overall score is guided by cost, risk, scalability, complexity, and global readiness.",
    "",
    "## Cost Estimate",
    "Cost is modeled deterministically with static assumptions.",
    "",
    "## Risk Matrix",
    "High focus on settlement, reserve, and fraud controls.",
    "",
    "## Roadmap",
    "1. Establish architecture baseline",
    "2. Implement deterministic simulators",
    "3. Add vendor scoring and decision trees",
    "",
    "## Implementation Phases",
    "Phase 1: design, Phase 2: pilot, Phase 3: scale",
    "",
    "## Recommendations",
    "Keep the implementation modular, deterministic, and offline-first."
  ].join("\n");
}
