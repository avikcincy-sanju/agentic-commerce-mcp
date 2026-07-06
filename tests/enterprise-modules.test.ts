import assert from "node:assert/strict";
import { buildDecisionTree } from "../src/decision-engine/engine.js";
import { compareVendorSet } from "../src/vendor-engine/engine.js";
import { scoreVendor } from "../src/scoring/engine.js";
import { simulatePaymentScenario } from "../src/simulator-engine/engine.js";
import { buildArchitectureCopilotReport } from "../src/copilot/engine.js";
import { buildConsultingReport } from "../src/reports/consulting.js";

const decision = buildDecisionTree({
  title: "Marketplace Decision",
  question: "Marketplace?",
  yesLabel: "Own merchant?",
  yesBranch: [
    { label: "YES", result: "Platform PayFac" },
    { label: "NO", result: "Marketplace MOR" }
  ],
  noBranch: [{ label: "NO", result: "Marketplace MOR" }]
});
assert.ok(decision.ascii.includes("Marketplace?"));
assert.ok(decision.mermaid.includes("flowchart"));
assert.ok(decision.plantuml.includes("@startuml"));

const comparison = compareVendorSet({
  title: "PSP Comparison",
  vendors: ["Stripe", "Adyen"],
  metrics: ["Marketplace", "Split Payments", "Stablecoin"],
  values: {
    Stripe: ["YES", "YES", "NO"],
    Adyen: ["YES", "YES", "YES"]
  }
});
assert.ok(comparison.includes("| Feature | Stripe | Adyen |"));

const score = scoreVendor({ vendor: "Stripe", dimensions: { cost: 90, risk: 85, complexity: 80, scalability: 90, developerExperience: 85, globalCoverage: 80, settlementSpeed: 75, treasuryEfficiency: 70, stablecoinReadiness: 78, marketplaceReadiness: 82 } });
assert.ok(score.overallScore >= 0);
assert.ok(score.strengths.length > 0);

const simulation = simulatePaymentScenario({
  transactionVolume: 100000,
  countries: 3,
  currencies: 2,
  gmv: 5000000,
  settlementRail: "Domestic Traditional",
  psp: "Stripe",
  marketplaceModel: "Marketplace",
  merchantOwnership: "Platform"
});
assert.ok(simulation.authorizationRate > 0);
assert.ok(simulation.revenue > 0);

const copilot = buildArchitectureCopilotReport({
  scenario: "A marketplace wants to launch in three countries with stablecoin settlement and embedded finance",
  domain: "marketplace"
});
assert.ok(copilot.markdown.includes("Executive Summary"));
assert.ok(copilot.mermaid.includes("flowchart"));
assert.ok(copilot.plantuml.includes("@startuml"));

const report = buildConsultingReport({
  scenario: "An ISV wants to expand globally with treasury and stablecoins",
  vendor: "Stripe"
});
assert.ok(report.includes("Executive Summary"));

console.log("enterprise modules smoke tests passed");
