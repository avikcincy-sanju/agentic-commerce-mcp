import type { ToolDefinition } from "../models/tool-definition.js";
import { ToolDefinitionSchema } from "../schemas/tool-definition.js";
import { getToolCatalog } from "../services/tool-registry.js";

export function getToolManifest(): ToolDefinition[] {
  return getToolCatalog().map((entry) => ToolDefinitionSchema.parse(entry));
}
