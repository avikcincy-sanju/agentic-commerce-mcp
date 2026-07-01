import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { searchKnowledge } from "../knowledge/knowledge.js";

export function registerSearchStablecoins(server: McpServer) {
  server.tool(
    "search_stablecoins",
    "Search local knowledge for stablecoin settlement topics.",
    {
      query: z.string().default("stablecoin")
    },
    async ({ query }) => {
      const results = searchKnowledge(query, "Stablecoins");
      return text(`## Stablecoin Knowledge Search

${results.map((item) => `- ${item.title}: ${item.summary}`).join("\n") || "No local stablecoin knowledge matched the query."}`);
    }
  );
}
