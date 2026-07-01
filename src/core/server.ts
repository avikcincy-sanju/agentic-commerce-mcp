import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerAllTools } from "../services/tool-registry.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "agentic-commerce-architecture-mcp",
    version: "0.1.0"
  });

  registerAllTools(server);
  return server;
}
