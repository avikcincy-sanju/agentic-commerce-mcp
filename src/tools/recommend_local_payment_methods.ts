import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { localPaymentMethods } from "../knowledge/payments.js";

export function registerRecommendLocalPaymentMethods(server: McpServer) {
  server.tool(
    "recommend_local_payment_methods",
    "Recommend local payment methods for a given country.",
    {
      country: z.string().default("UnitedStates")
    },
    async ({ country }) => {
      const methods = localPaymentMethods[country] ?? localPaymentMethods.Default;

      return text(`## Local Payment Method Recommendation

For ${country}, a strong educational mix would include:

- ${methods.join("\n- ")}

### Best practice
Match the payment mix to local consumer behavior, settlement speed, and merchant risk preference.`);
    }
  );
}
