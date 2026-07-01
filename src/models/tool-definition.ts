export interface ToolDefinition {
  readonly name: string;
  readonly category:
    | "core"
    | "payments"
    | "treasury"
    | "marketplaces"
    | "agentic"
    | "connectors"
    | "reporting";
  readonly description: string;
}
