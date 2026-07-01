import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { searchKnowledge } from "../knowledge/knowledge.js";

export function registerSearchAgenticCommerce(server: McpServer) {
  server.tool(
    "search_agentic_commerce",
    "Search local knowledge for agentic commerce topics.",
    {
      query: z.string().default("agentic")
    },
    async ({ query }) => {
      const results = searchKnowledge(query, "Agentic Commerce");
      return text(`## Agentic Commerce Knowledge Search

${results.map((item) => `- ${item.title}: ${item.summary}`).join("\n") || "No local agentic commerce knowledge matched the query."}`);
    }
  );
}
