# Agentic Commerce Architecture Copilot

An educational, deterministic MCP server for agentic commerce architecture that now includes decision trees, vendor comparison, architecture scoring, payment simulation, copilot-style reporting, and consulting-style reports while remaining fully offline.

## Architecture

The codebase is organized into modular folders:

- src/tools for MCP tool registrations
- src/decision-engine for deterministic decision tree generation
- src/vendor-engine for vendor comparison tables
- src/scoring for weighted architecture scoring
- src/simulator-engine for offline payment simulations
- src/copilot for copilot-style architecture reports
- src/reports for consulting-style reports
- src/knowledge for reusable static knowledge objects
- src/calculators for lightweight estimation logic
- src/simulators for educational flow simulations
- src/advisors for architecture recommendations
- src/utils for shared helpers

## Available tools

### Existing tools preserved
- compare_channels
- compare_gtm_models
- simulate_agentic_checkout
- compare_settlement_rails
- explain_merchant_endpoint
- recommend_architecture
- calculate_payment_cost
- simulate_treasury_flow

### Architecture decision tools
- recommend_payment_architecture
- recommend_gtm_model
- recommend_mor_strategy
- recommend_settlement_strategy
- recommend_treasury_architecture
- recommend_crossborder_model
- recommend_agentic_architecture
- architecture_decision_engine

### Payment cost and economics tools
- estimate_processor_cost
- compare_processors
- estimate_fx_cost
- estimate_interchange
- compare_settlement_cost
- compare_processor_pricing
- calculate_working_capital

### AI commerce simulation tools
- simulate_agent_checkout
- simulate_marketplace
- simulate_embedded_finance
- simulate_crossborder_payment
- simulate_multi_agent_purchase
- simulate_subscription
- simulate_refund_flow
- simulate_agent_payment
- simulate_multi_agent_marketplace
- simulate_stablecoin_settlement

### Stablecoin tools
- compare_traditional_vs_stablecoin
- recommend_stablecoin_rail
- estimate_stablecoin_savings
- simulate_usdc_settlement
- simulate_crossborder_usdc

### Merchant onboarding tools
- design_merchant_onboarding
- recommend_kyc_flow
- recommend_underwriting
- recommend_split_payment_model
- recommend_marketplace_model
- recommend_payfac_model

### Diagram and knowledge tools
- design_solution_architecture
- design_payment_flow
- design_treasury_flow
- design_marketplace
- design_payfac
- generate_payment_architecture
- generate_architecture_report
- search_knowledge
- search_payments
- search_treasury
- search_stablecoins
- search_agentic_commerce
- list_connectors

### New decision-engine tools
- generate_decision_tree
- generate_checkout_decision
- generate_psp_selection_tree
- generate_mor_decision
- generate_payfac_decision
- generate_settlement_decision
- generate_marketplace_decision
- generate_crossborder_decision

### New vendor-engine tools
- compare_psps
- compare_orchestrators
- compare_treasury
- compare_stablecoin_providers
- compare_kyc
- compare_fraud
- compare_local_payment_methods
- compare_embedded_finance

### New scoring tools
- score_architecture
- score_vendor
- score_psp
- score_treasury
- score_crossborder
- score_marketplace
- score_payfac

### New simulator-engine tools
- simulate_payment_network
- simulate_checkout
- simulate_marketplace
- simulate_settlement
- simulate_refunds
- simulate_chargebacks
- simulate_crossborder
- simulate_stablecoin
- simulate_fx
- simulate_multi_psp
- simulate_failover

### New copilot tools
- architecture_copilot
- design_platform
- design_marketplace
- design_payfac
- design_embedded_finance
- design_crossborder
- design_agentic_commerce
- design_stablecoin_platform
- design_treasury

### New reporting tools
- generate_consulting_report

## Example prompts

- compare_channels with channel = ISV
- compare_gtm_models with model = Marketplace
- recommend_architecture with business_type = Marketplace, geography = Global, priority = Speed
- recommend_payment_architecture with business_model = Marketplace, country = Brazil, region = Global, settlement_preference = Stablecoin, scale = Enterprise, gmv = 25000000, transaction_volume = 120000, cross_border_requirements = Yes, marketplace = true, pay_fac = true, embedded_finance = false, stablecoin_preference = Yes
- recommend_gtm_model with business_model = Enterprise, merchant_ownership = Platform, country = UnitedStates, region = Domestic, scale = Growth, gmv = 10000000
- recommend_mor_strategy with business_model = Marketplace, merchant_ownership = Platform, country = UnitedStates, region = Global, settlement_preference = Traditional, scale = Enterprise, gmv = 50000000
- recommend_settlement_strategy with business_model = Marketplace, country = Brazil, region = Global, settlement_preference = Stablecoin, cross_border_requirements = Yes
- recommend_treasury_architecture with business_model = Marketplace, scale = Enterprise, gmv = 100000000
- recommend_crossborder_model with business_model = Marketplace, country = Brazil, region = Global, cross_border_requirements = Yes
- recommend_agentic_architecture with business_model = Marketplace, country = UnitedStates, region = Domestic, marketplace = true
- estimate_processor_cost with annual_volume = 10000000, average_ticket = 200
- compare_processors with vendor1 = Stripe, vendor2 = Adyen
- estimate_fx_cost with volume = 100000, fx_spread = 0.75
- estimate_interchange with volume = 1000000, card_rate_percent = 2.5
- compare_settlement_cost with volume = 1000000, fx_spread = 0.75, settlement_type = Hybrid
- simulate_agent_checkout with channel = ISO, payment_method = Visa, settlement = Traditional
- simulate_marketplace with buyers = 10, sellers = 20, settlement = Traditional
- simulate_embedded_finance with product = Working capital
- simulate_crossborder_payment with origin_country = UnitedStates, destination_country = Brazil
- simulate_multi_agent_purchase with buyers = 2, sellers = 3
- simulate_subscription with billing_cycle = Monthly
- simulate_refund_flow with settlement = Traditional
- compare_traditional_vs_stablecoin with settlement_preference = Hybrid
- recommend_stablecoin_rail with currency = USD, destination = Brazil, preference = Speed
- estimate_stablecoin_savings with volume = 1000000, traditional_cost_percent = 0.25, stablecoin_cost_percent = 0.1
- simulate_usdc_settlement with destination = Seller wallet
- simulate_crossborder_usdc with origin_country = UnitedStates, destination_country = Brazil
- design_merchant_onboarding with merchant_type = Marketplace
- recommend_kyc_flow with merchant_type = Marketplace
- recommend_underwriting with merchant_type = Marketplace
- recommend_split_payment_model with business_model = Marketplace
- recommend_marketplace_model with business_model = Marketplace
- recommend_payfac_model with business_model = ISV
- design_solution_architecture with business_model = Marketplace
- design_payment_flow with business_model = Marketplace
- design_treasury_flow with business_model = Marketplace
- design_marketplace with business_model = Marketplace
- design_payfac with business_model = ISV
- generate_payment_architecture with merchant = Marketplace, psp = Stripe, model = Platform PayFac, settlement = Traditional
- generate_architecture_report with business = Marketplace, countries = US, Canada, Brazil, merchant_ownership = Platform, settlement = Traditional, treasury = Kyriba, erp = NetSuite
- search_knowledge with query = stablecoin
- list_connectors with provider = Stripe
- generate_decision_tree with title = Marketplace Decision, question = Marketplace?
- compare_psps with vendors = ["Stripe", "Adyen"]
- score_architecture with vendor = Stripe
- simulate_payment_network with transactionVolume = 100000, countries = 3, currencies = 2, gmv = 5000000, settlementRail = Domestic Traditional, psp = Stripe, marketplaceModel = Marketplace, merchantOwnership = Platform
- architecture_copilot with scenario = A marketplace wants to launch in three countries with stablecoin settlement and embedded finance, domain = marketplace
- generate_consulting_report with scenario = An ISV wants to expand globally, vendor = Stripe

## Architecture diagrams

- Decision trees: ASCII, Mermaid, and PlantUML output are generated directly by the decision-engine tools.
- Copilot reports: Mermaid and PlantUML diagrams are included alongside Markdown output.
- Placeholder screenshots: add product screenshots to docs/screenshots/ when available.

## Interactive demo

https://avikcincy-sanju.github.io/MCPDemo/

## Local run

```bash
npm install
npm run build
npm start
