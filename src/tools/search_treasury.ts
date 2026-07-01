import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { searchKnowledge } from "../knowledge/knowledge.js";

export function registerSearchTreasury(server: McpServer) {
  server.tool(
    "search_treasury",
    "Search local knowledge for treasury architecture topics.",
    {
      query: z.string().default("treasury")
    },
    async ({ query }) => {
      const results = searchKnowledge(query, "Stablecoins");
      return text(`## Treasury Knowledge Search

${results.map((item) => `- ${item.title}: ${item.summary}`).join("\n") || "No local treasury knowledge matched the query."}`);
    }
  );
}
