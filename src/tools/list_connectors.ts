import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { text } from "../utils/text.js";
import { listConnectorAdapters } from "./connectors.js";

export function registerListConnectors(server: McpServer) {
  server.tool(
    "list_connectors",
    "List optional connector adapter stubs for future integration.",
    {
      provider: z.string().optional()
    },
    async ({ provider }) => {
      const adapters = listConnectorAdapters().filter((item) => !provider || item.name.toLowerCase().includes(provider.toLowerCase()));
      const rows = adapters.map((item) => `| ${item.name} | ${item.description} | ${item.enabled ? "Enabled" : "Stub"} | ${item.capabilities.join(", ")} |`).join("\n");
      return text(`## Connector Adapters\n\n| Provider | Description | Status | Capabilities |\n| --- | --- | --- | --- |\n${rows}`);
    }
  );
}
