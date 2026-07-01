import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";

export function registerRecommendArchitecture(server: McpServer) {
  server.tool(
    "recommend_architecture",
    "Recommend a simulated architecture for an agentic commerce scenario.",
    {
      business_type: z.enum(["ISV", "ISO", "Marketplace", "Enterprise"]).default("ISV"),
      geography: z.enum(["Domestic", "Cross-border", "Global"]).default("Domestic"),
      priority: z.enum(["Control", "Speed", "Compliance simplicity", "Cost optimization"]).default("Control")
    },
    async ({ business_type, geography, priority }) => {
      let channel = "ISV";
      let gtmModel = "Platform PayFac";
      let settlementRail = geography === "Domestic" ? "Domestic Traditional" : "Cross-border Traditional";
      let why = "This keeps ownership close to the seller and preserves the highest level of control.";

      if (business_type === "Marketplace") {
        channel = "Marketplace/MOR";
        gtmModel = "Marketplace";
        settlementRail = geography === "Global" ? "Cross-border USDC" : settlementRail;
        why = "Marketplace ownership is a natural fit when the platform wants to manage checkout, catalogue, and payout orchestration.";
      } else if (business_type === "ISO") {
        channel = "ISO";
        gtmModel = geography === "Global" ? "Agentic Gateway" : "ISO Gateway";
        why = "An ISO can expose agent-ready access over an existing merchant portfolio without re-architecting the full stack.";
      } else if (business_type === "Enterprise") {
        channel = "ISV";
        gtmModel = "Embedded Finance";
        why = "Enterprise buyers often need deeper financial services and policy control beyond simple acceptance.";
      }

      if (priority === "Speed") {
        channel = business_type === "Marketplace" ? "Marketplace/MOR" : "ISO";
        gtmModel = business_type === "Marketplace" ? "Marketplace" : "Agentic Gateway";
        settlementRail = geography === "Global" ? "Cross-border USDC" : settlementRail;
        why = "This prioritizes rapid routing, simpler onboarding, and faster payout experiences for the buyer and seller.";
      } else if (priority === "Compliance simplicity") {
        channel = "ISO";
        gtmModel = "ISO Gateway";
        settlementRail = geography === "Domestic" ? "Domestic Traditional" : "Cross-border Traditional";
        why = "This leans on established merchant relationships and a more predictable compliance model.";
      } else if (priority === "Cost optimization") {
        settlementRail = geography === "Global" ? "Cross-border USDC" : "Domestic USDC";
        why = "This reduces dependency on some traditional cross-border banking steps and can lower settlement friction for the scenario.";
      }

      return text(`## Simulated Architecture Recommendation

| Dimension | Recommendation |
| --- | --- |
| Business type | ${business_type} |
| Geography | ${geography} |
| Priority | ${priority} |
| Channel | ${channel} |
| GTM model | ${gtmModel} |
| Settlement rail | ${settlementRail} |

### Why
${why}

### Educational note
This is a static, simulated recommendation for learning purposes only and does not connect to any real payment network.`);
    }
  );
}
