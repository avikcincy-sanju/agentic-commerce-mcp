import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerDesignMerchantOnboarding(server: McpServer) {
  server.tool(
    "design_merchant_onboarding",
    "Generate a deterministic merchant onboarding workflow.",
    {
      merchant_type: z.string().default("Marketplace")
    },
    async ({ merchant_type }) => {
      return text(`## Merchant Onboarding Workflow

### Flow
1. Intake and merchant profile capture
2. KYC and identity verification
3. Business profile and tax review
4. Risk and underwriting review
5. PSP and settlement setup
6. Dashboard and reporting enablement
7. Go-live checklist and support handoff

### Recommended focus for ${merchant_type}
- Clear seller onboarding stages
- Payout and reserve configuration
- Monitoring and exception handling

### Educational note
This is a simplified, deterministic onboarding workflow for architecture discussions.`);
    }
  );
}
