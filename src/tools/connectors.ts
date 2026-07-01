export interface ConnectorAdapter {
  name: string;
  description: string;
  enabled: boolean;
  capabilities: string[];
}

export const connectorAdapters: ConnectorAdapter[] = [
  {
    name: "Stripe",
    description: "Educational adapter stub for payment orchestration workflows.",
    enabled: false,
    capabilities: ["Payments", "Payouts", "Reporting"]
  },
  {
    name: "GitHub",
    description: "Educational adapter stub for product and engineering coordination.",
    enabled: false,
    capabilities: ["Issues", "Projects", "Releases"]
  },
  {
    name: "Jira",
    description: "Educational adapter stub for delivery and implementation tracking.",
    enabled: false,
    capabilities: ["Backlog", "Roadmaps", "Epics"]
  },
  {
    name: "Notion",
    description: "Educational adapter stub for architecture notes and playbooks.",
    enabled: false,
    capabilities: ["Docs", "Knowledge", "Process"]
  },
  {
    name: "Confluence",
    description: "Educational adapter stub for enterprise documentation.",
    enabled: false,
    capabilities: ["Docs", "Pages", "Spaces"]
  },
  {
    name: "Snowflake",
    description: "Educational adapter stub for analytics and reporting.",
    enabled: false,
    capabilities: ["Warehouse", "Analytics", "Reporting"]
  },
  {
    name: "Postgres",
    description: "Educational adapter stub for transactional data and reconciliation.",
    enabled: false,
    capabilities: ["Database", "Reports", "Queries"]
  },
  {
    name: "OpenAPI",
    description: "Educational adapter stub for API contract-driven integrations.",
    enabled: false,
    capabilities: ["Schemas", "Operations", "Contracts"]
  }
];

export function listConnectorAdapters() {
  return connectorAdapters;
}
