import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { searchKnowledge } from "../knowledge/knowledge.js";

export function registerSearchKnowledge(server: McpServer) {
  server.tool(
    "search_knowledge",
    "Search local, deterministic knowledge entries for payments and commerce architecture topics.",
    {
      query: z.string().default("payments"),
      category: z.string().optional()
    },
    async ({ query, category }) => {
      const results = searchKnowledge(query, category);
      const rows = results.map((item) => `| ${item.title} | ${item.category} | ${item.summary} |`).join("\n");

      return text(`## Knowledge Search

| Title | Category | Summary |
| --- | --- | --- |
${rows || "| No results | — | No local knowledge entries matched the query. |"}

### Educational note
This uses local, deterministic knowledge content only.`);
    }
  );
}
