import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { estimateWorkingCapital } from "../calculators/estimates.js";

export function registerCalculateWorkingCapital(server: McpServer) {
  server.tool(
    "calculate_working_capital",
    "Estimate the working capital locked in settlement.",
    {
      daily_sales: z.number(),
      settlement_days: z.number()
    },
    async ({ daily_sales, settlement_days }) => {
      const workingCapital = estimateWorkingCapital(daily_sales, settlement_days);

      return text(`## Working Capital Estimate

| Metric | Value |
| --- | ---: |
| Daily sales | ${daily_sales.toFixed(2)} |
| Settlement days | ${settlement_days} |
| Estimated working capital locked | ${workingCapital.toFixed(2)} |

### Educational note
This is a simple educational estimate for treasury planning and does not represent a real liquidity model.`);
    }
  );
}
