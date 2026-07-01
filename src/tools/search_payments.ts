import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { searchKnowledge } from "../knowledge/knowledge.js";

export function registerSearchPayments(server: McpServer) {
  server.tool(
    "search_payments",
    "Search local knowledge for payment architecture topics.",
    {
      query: z.string().default("payments")
    },
    async ({ query }) => {
      const results = searchKnowledge(query, "Payments");
      return text(`## Payments Knowledge Search

${results.map((item) => `- ${item.title}: ${item.summary}`).join("\n") || "No local payments knowledge matched the query."}`);
    }
  );
}
