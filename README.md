# Agentic Commerce Architecture Expert

An educational MCP server that helps product, payments, and platform teams explore agentic commerce architecture in a deterministic, self-contained way.

## Architecture

The codebase is organized into modular folders:

- src/tools for MCP tool registrations
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

## Interactive demo

https://avikcincy-sanju.github.io/MCPDemo/

## Local run

```bash
npm install
npm run build
npm start
