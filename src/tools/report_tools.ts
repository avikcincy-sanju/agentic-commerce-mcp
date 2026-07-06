import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { buildConsultingReport } from "../reports/consulting.js";
import { text } from "../utils/text.js";

export function registerReportTools(server: McpServer) {
  server.tool(
    "generate_consulting_report",
    "Generate a deterministic McKinsey/Bain-style consulting report.",
    { scenario: z.string().default("A merchant wants to launch globally"), vendor: z.string().default("Stripe") },
    async ({ scenario, vendor }) => text(buildConsultingReport({ scenario, vendor }))
  );
}
