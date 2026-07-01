import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { ToolDefinition } from "../models/tool-definition.js";
import { ToolDefinitionSchema } from "../schemas/tool-definition.js";

import { registerArchitectureDecisionEngine } from "../tools/architecture_decision_engine.js";
import { registerCalculatePaymentCost } from "../tools/calculate_payment_cost.js";
import { registerCalculateWorkingCapital } from "../tools/calculate_working_capital.js";
import { registerCompareChannels } from "../tools/compare_channels.js";
import { registerCompareGtmModels } from "../tools/compare_gtm_models.js";
import { registerCompareProcessorPricing } from "../tools/compare_processor_pricing.js";
import { registerCompareProcessors } from "../tools/compare_processors.js";
import { registerCompareSettlementCost } from "../tools/compare_settlement_cost.js";
import { registerCompareSettlementRails } from "../tools/compare_settlement_rails.js";
import { registerCompareTraditionalVsStablecoin } from "../tools/compare_traditional_vs_stablecoin.js";
import { registerCompareVendors } from "../tools/compare_vendors.js";
import { registerDesignMarketplace } from "../tools/design_marketplace.js";
import { registerDesignPayfac } from "../tools/design_payfac.js";
import { registerDesignPaymentFlow } from "../tools/design_payment_flow.js";
import { registerDesignSolutionArchitecture } from "../tools/design_solution_architecture.js";
import { registerDesignTreasuryFlow } from "../tools/design_treasury_flow.js";
import { registerDesignMerchantOnboarding } from "../tools/design_merchant_onboarding.js";
import { registerExplainMerchantEndpoint } from "../tools/explain_merchant_endpoint.js";
import { registerEstimateFxCost } from "../tools/estimate_fx_cost.js";
import { registerEstimateInterchange } from "../tools/estimate_interchange.js";
import { registerEstimateProcessorCost } from "../tools/estimate_processor_cost.js";
import { registerEstimateStablecoinSavings } from "../tools/estimate_stablecoin_savings.js";
import { registerGenerateArchitectureReport } from "../tools/generate_architecture_report.js";
import { registerGeneratePaymentArchitecture } from "../tools/generate_payment_architecture.js";
import { registerListConnectors } from "../tools/list_connectors.js";
import { registerRecommendAgenticArchitecture } from "../tools/recommend_agentic_architecture.js";
import { registerRecommendArchitecture } from "../tools/recommend_architecture.js";
import { registerRecommendCrossborderModel } from "../tools/recommend_crossborder_model.js";
import { registerRecommendGtmModel } from "../tools/recommend_gtm_model.js";
import { registerRecommendKycFlow } from "../tools/recommend_kyc_flow.js";
import { registerRecommendLocalPaymentMethods } from "../tools/recommend_local_payment_methods.js";
import { registerRecommendMarketplaceModel } from "../tools/recommend_marketplace_model.js";
import { registerRecommendMorModel } from "../tools/recommend_mor_model.js";
import { registerRecommendPayfacModel } from "../tools/recommend_payfac_model.js";
import { registerRecommendPaymentArchitecture } from "../tools/recommend_payment_architecture.js";
import { registerRecommendPsp } from "../tools/recommend_psp.js";
import { registerRecommendSplitPaymentModel } from "../tools/recommend_split_payment_model.js";
import { registerRecommendStablecoinRail } from "../tools/recommend_stablecoin_rail.js";
import { registerRecommendSettlementStrategy } from "../tools/recommend_settlement_strategy.js";
import { registerRecommendTreasuryArchitecture } from "../tools/recommend_treasury_architecture.js";
import { registerRecommendUnderwriting } from "../tools/recommend_underwriting.js";
import { registerSearchAgenticCommerce } from "../tools/search_agentic_commerce.js";
import { registerSearchKnowledge } from "../tools/search_knowledge.js";
import { registerSearchPayments } from "../tools/search_payments.js";
import { registerSearchStablecoins } from "../tools/search_stablecoins.js";
import { registerSearchTreasury } from "../tools/search_treasury.js";
import { registerSimulateAgentCheckout } from "../tools/simulate_agent_checkout.js";
import { registerSimulateAgenticCheckout } from "../tools/simulate_agentic_checkout.js";
import { registerSimulateAgentPayment } from "../tools/simulate_agent_payment.js";
import { registerSimulateCrossborderPayment } from "../tools/simulate_crossborder_payment.js";
import { registerSimulateCrossborderUsdc } from "../tools/simulate_crossborder_usdc.js";
import { registerSimulateEmbeddedFinance } from "../tools/simulate_embedded_finance.js";
import { registerSimulateMarketplace } from "../tools/simulate_marketplace.js";
import { registerSimulateMultiAgentMarketplace } from "../tools/simulate_multi_agent_marketplace.js";
import { registerSimulateMultiAgentPurchase } from "../tools/simulate_multi_agent_purchase.js";
import { registerSimulateStablecoinSettlement } from "../tools/simulate_stablecoin_settlement.js";
import { registerSimulateSubscription } from "../tools/simulate_subscription.js";
import { registerSimulateTreasuryFlow } from "../tools/simulate_treasury_flow.js";
import { registerSimulateUsdcSettlement } from "../tools/simulate_usdc_settlement.js";
import { registerSimulateRefundFlow } from "../tools/simulate_refund_flow.js";

const toolCatalogEntries: Array<Omit<ToolDefinition, "category"> & { category: ToolDefinition["category"] }> = [
  { name: "compare_channels", category: "payments", description: "Compare channel economics and suitability" },
  { name: "compare_gtm_models", category: "marketplaces", description: "Compare GTM models for launches" },
  { name: "simulate_agentic_checkout", category: "agentic", description: "Simulate an agentic checkout flow" },
  { name: "compare_settlement_rails", category: "payments", description: "Compare settlement rails" },
  { name: "explain_merchant_endpoint", category: "payments", description: "Explain merchant endpoint options" },
  { name: "recommend_architecture", category: "core", description: "Recommend a high-level architecture" },
  { name: "calculate_payment_cost", category: "payments", description: "Estimate payment processing cost" },
  { name: "simulate_treasury_flow", category: "treasury", description: "Simulate a treasury flow" },
  { name: "recommend_gtm_model", category: "marketplaces", description: "Recommend a GTM motion" },
  { name: "recommend_psp", category: "payments", description: "Recommend a PSP strategy" },
  { name: "compare_processor_pricing", category: "payments", description: "Compare processor pricing models" },
  { name: "estimate_fx_cost", category: "payments", description: "Estimate FX costs and spreads" },
  { name: "recommend_local_payment_methods", category: "payments", description: "Recommend local payment methods" },
  { name: "recommend_mor_model", category: "payments", description: "Recommend a MOR model" },
  { name: "simulate_agent_payment", category: "agentic", description: "Simulate an agent payment" },
  { name: "simulate_multi_agent_marketplace", category: "agentic", description: "Simulate multi-agent marketplace activity" },
  { name: "simulate_stablecoin_settlement", category: "payments", description: "Simulate stablecoin settlement" },
  { name: "calculate_working_capital", category: "treasury", description: "Estimate working capital needs" },
  { name: "compare_vendors", category: "payments", description: "Compare solution vendors" },
  { name: "generate_payment_architecture", category: "payments", description: "Generate a payment architecture view" },
  { name: "architecture_decision_engine", category: "core", description: "Capture architecture decisions" },
  { name: "recommend_payment_architecture", category: "payments", description: "Recommend a payment architecture" },
  { name: "recommend_settlement_strategy", category: "payments", description: "Recommend a settlement strategy" },
  { name: "recommend_treasury_architecture", category: "treasury", description: "Recommend a treasury architecture" },
  { name: "recommend_crossborder_model", category: "payments", description: "Recommend a cross-border model" },
  { name: "recommend_agentic_architecture", category: "agentic", description: "Recommend an agentic architecture" },
  { name: "estimate_processor_cost", category: "payments", description: "Estimate processor cost" },
  { name: "compare_processors", category: "payments", description: "Compare processors" },
  { name: "estimate_interchange", category: "payments", description: "Estimate interchange" },
  { name: "compare_settlement_cost", category: "payments", description: "Compare settlement cost" },
  { name: "simulate_agent_checkout", category: "agentic", description: "Simulate a checkout flow" },
  { name: "simulate_marketplace", category: "marketplaces", description: "Simulate a marketplace flow" },
  { name: "simulate_embedded_finance", category: "payments", description: "Simulate embedded finance" },
  { name: "simulate_crossborder_payment", category: "payments", description: "Simulate a cross-border payment" },
  { name: "simulate_multi_agent_purchase", category: "agentic", description: "Simulate a multi-agent purchase" },
  { name: "simulate_subscription", category: "payments", description: "Simulate a subscription flow" },
  { name: "simulate_refund_flow", category: "payments", description: "Simulate a refund flow" },
  { name: "compare_traditional_vs_stablecoin", category: "payments", description: "Compare traditional vs stablecoin flows" },
  { name: "recommend_stablecoin_rail", category: "payments", description: "Recommend a stablecoin rail" },
  { name: "estimate_stablecoin_savings", category: "payments", description: "Estimate stablecoin savings" },
  { name: "simulate_usdc_settlement", category: "payments", description: "Simulate USDC settlement" },
  { name: "simulate_crossborder_usdc", category: "payments", description: "Simulate USDC cross-border settlement" },
  { name: "design_merchant_onboarding", category: "payments", description: "Design a merchant onboarding flow" },
  { name: "recommend_kyc_flow", category: "payments", description: "Recommend a KYC strategy" },
  { name: "recommend_underwriting", category: "payments", description: "Recommend underwriting guidance" },
  { name: "recommend_split_payment_model", category: "payments", description: "Recommend a split-payment model" },
  { name: "recommend_marketplace_model", category: "marketplaces", description: "Recommend a marketplace model" },
  { name: "recommend_payfac_model", category: "payments", description: "Recommend a PayFac model" },
  { name: "design_solution_architecture", category: "core", description: "Design a solution architecture" },
  { name: "design_payment_flow", category: "payments", description: "Design a payment flow" },
  { name: "design_treasury_flow", category: "treasury", description: "Design a treasury flow" },
  { name: "design_marketplace", category: "marketplaces", description: "Design a marketplace architecture" },
  { name: "design_payfac", category: "payments", description: "Design a PayFac architecture" },
  { name: "search_knowledge", category: "core", description: "Search curated knowledge" },
  { name: "search_payments", category: "payments", description: "Search payment knowledge" },
  { name: "search_treasury", category: "treasury", description: "Search treasury knowledge" },
  { name: "search_stablecoins", category: "payments", description: "Search stablecoin knowledge" },
  { name: "search_agentic_commerce", category: "agentic", description: "Search agentic commerce knowledge" },
  { name: "generate_architecture_report", category: "reporting", description: "Generate architecture report" },
  { name: "list_connectors", category: "connectors", description: "List available enterprise connectors" }
];

export const toolCatalog: ToolDefinition[] = toolCatalogEntries.map((entry) => ToolDefinitionSchema.parse(entry));

export function getToolCatalog(): ToolDefinition[] {
  return toolCatalog.map((entry) => ({ ...entry }));
}

export function registerAllTools(server: McpServer): void {
  registerCompareChannels(server);
  registerCompareGtmModels(server);
  registerSimulateAgenticCheckout(server);
  registerCompareSettlementRails(server);
  registerExplainMerchantEndpoint(server);
  registerRecommendArchitecture(server);
  registerCalculatePaymentCost(server);
  registerSimulateTreasuryFlow(server);
  registerRecommendGtmModel(server);
  registerRecommendPsp(server);
  registerCompareProcessorPricing(server);
  registerEstimateFxCost(server);
  registerRecommendLocalPaymentMethods(server);
  registerRecommendMorModel(server);
  registerSimulateAgentPayment(server);
  registerSimulateMultiAgentMarketplace(server);
  registerSimulateStablecoinSettlement(server);
  registerCalculateWorkingCapital(server);
  registerCompareVendors(server);
  registerGeneratePaymentArchitecture(server);
  registerArchitectureDecisionEngine(server);
  registerRecommendPaymentArchitecture(server);
  registerRecommendSettlementStrategy(server);
  registerRecommendTreasuryArchitecture(server);
  registerRecommendCrossborderModel(server);
  registerRecommendAgenticArchitecture(server);
  registerEstimateProcessorCost(server);
  registerCompareProcessors(server);
  registerEstimateInterchange(server);
  registerCompareSettlementCost(server);
  registerSimulateAgentCheckout(server);
  registerSimulateMarketplace(server);
  registerSimulateEmbeddedFinance(server);
  registerSimulateCrossborderPayment(server);
  registerSimulateMultiAgentPurchase(server);
  registerSimulateSubscription(server);
  registerSimulateRefundFlow(server);
  registerCompareTraditionalVsStablecoin(server);
  registerRecommendStablecoinRail(server);
  registerEstimateStablecoinSavings(server);
  registerSimulateUsdcSettlement(server);
  registerSimulateCrossborderUsdc(server);
  registerDesignMerchantOnboarding(server);
  registerRecommendKycFlow(server);
  registerRecommendUnderwriting(server);
  registerRecommendSplitPaymentModel(server);
  registerRecommendMarketplaceModel(server);
  registerRecommendPayfacModel(server);
  registerDesignSolutionArchitecture(server);
  registerDesignPaymentFlow(server);
  registerDesignTreasuryFlow(server);
  registerDesignMarketplace(server);
  registerDesignPayfac(server);
  registerSearchKnowledge(server);
  registerSearchPayments(server);
  registerSearchTreasury(server);
  registerSearchStablecoins(server);
  registerSearchAgenticCommerce(server);
  registerGenerateArchitectureReport(server);
  registerListConnectors(server);
}
