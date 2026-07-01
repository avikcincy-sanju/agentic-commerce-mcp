import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerGenerateArchitectureReport(server: McpServer) {
  server.tool(
    "generate_architecture_report",
    "Generate a professional, educational architecture report for a commerce scenario.",
    {
      business: z.string().default("Marketplace"),
      countries: z.string().default("US, Canada, Brazil"),
      merchant_ownership: z.string().default("Platform"),
      settlement: z.string().default("Traditional"),
      treasury: z.string().default("Kyriba"),
      erp: z.string().default("NetSuite")
    },
    async ({ business, countries, merchant_ownership, settlement, treasury, erp }) => {
      return text(`## Architecture Report

### Executive Summary
A deterministic architecture recommendation for ${business} operating across ${countries} with ${merchant_ownership} merchant ownership and ${settlement} settlement.

### Recommended Architecture
- Platform-led checkout and routing
- Treasury controls around settlement and payout timing
- Localized payment methods and risk monitoring

### Component Diagram
\`\`\`mermaid
flowchart LR
Customer-->Agent
Agent-->Marketplace
Marketplace-->PSP
PSP-->Treasury
Treasury-->ERP
\`\`\`

### Payment Flow
Buyer intent → Merchant endpoint → PSP → Settlement → Treasury → ERP

### Treasury Flow
Settlement → Reserve → Payout Engine → Ledger

### Merchant Onboarding
Intake → KYC → Underwriting → Enablement → Go-live

### Compliance Considerations
- KYC and sanctions review
- Settlement and reserve policy
- Monitoring and exception workflows

### Risks
- FX friction
- Liquidity gaps
- Seller payout delays

### Alternatives
- Traditional bank-centric settlement
- Stablecoin-led settlement

### Estimated Implementation Complexity
Medium

### Technology Recommendations
- MCP-compatible agent interface
- Shared ledger and payout rules
- Treasury and ERP integration wrappers

### Future Enhancements
- Stablecoin settlement pilots
- Local payment method orchestration
- Detailed analytics and risk dashboards`);
    }
  );
}
