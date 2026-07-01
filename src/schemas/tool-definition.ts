import { z } from "zod";

export const ToolDefinitionSchema = z.object({
  name: z.string().min(1),
  category: z.enum([
    "core",
    "payments",
    "treasury",
    "marketplaces",
    "agentic",
    "connectors",
    "reporting"
  ]),
  description: z.string().min(1)
});

export type ToolDefinitionInput = z.infer<typeof ToolDefinitionSchema>;
