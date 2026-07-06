import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { compareVendorSet } from "../vendor-engine/engine.js";
import { text } from "../utils/text.js";

const vendorCatalog = {
  Stripe: ["YES", "YES", "NO", "GOOD", "LOW", "HIGH"],
  Adyen: ["YES", "YES", "YES", "EXCELLENT", "LOW", "HIGH"],
  "Checkout.com": ["YES", "YES", "YES", "GOOD", "MEDIUM", "HIGH"],
  Airwallex: ["YES", "YES", "YES", "GOOD", "MEDIUM", "HIGH"],
  dLocal: ["YES", "YES", "NO", "GOOD", "LOW", "MEDIUM"],
  Rapyd: ["YES", "YES", "YES", "GOOD", "LOW", "MEDIUM"],
  Nuvei: ["YES", "YES", "YES", "GOOD", "MEDIUM", "MEDIUM"],
  BVNK: ["YES", "YES", "YES", "EXCELLENT", "LOW", "MEDIUM"],
  Visa: ["YES", "YES", "NO", "GOOD", "LOW", "MEDIUM"],
  Mastercard: ["YES", "YES", "NO", "GOOD", "LOW", "MEDIUM"],
  Circle: ["YES", "YES", "YES", "GOOD", "LOW", "HIGH"],
  Bridge: ["YES", "YES", "YES", "GOOD", "LOW", "MEDIUM"],
  Fireblocks: ["YES", "YES", "YES", "EXCELLENT", "LOW", "LOW"]
};

function buildComparison(vendors: string[], metrics: string[]) {
  const values = Object.fromEntries(vendors.map((vendor) => [vendor, vendorCatalog[vendor as keyof typeof vendorCatalog] ?? ["N/A", "N/A", "N/A"]]));
  return compareVendorSet({ title: "Vendor Comparison", vendors, metrics, values });
}

export function registerVendorComparisonTools(server: McpServer) {
  server.tool(
    "compare_psps",
    "Create a deterministic markdown comparison table for PSPs.",
    { vendors: z.array(z.string()).default(["Stripe", "Adyen"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["Marketplace", "Split Payments", "Stablecoin", "Treasury", "Complexity", "Developer Experience"]))
  );

  server.tool(
    "compare_orchestrators",
    "Create a deterministic markdown comparison table for orchestrators.",
    { vendors: z.array(z.string()).default(["Stripe", "Adyen"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["Marketplace", "Split Payments", "Stablecoin", "Treasury", "Complexity", "Developer Experience"]))
  );

  server.tool(
    "compare_treasury",
    "Create a deterministic markdown comparison table for treasury providers.",
    { vendors: z.array(z.string()).default(["Fireblocks", "Bridge"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["Treasury", "Complexity", "Developer Experience", "Risk"]))
  );

  server.tool(
    "compare_stablecoin_providers",
    "Create a deterministic markdown comparison table for stablecoin providers.",
    { vendors: z.array(z.string()).default(["Circle", "BVNK"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["Stablecoin", "Treasury", "Settlement Speed", "Developer Experience"]))
  );

  server.tool(
    "compare_kyc",
    "Create a deterministic markdown comparison table for KYC providers.",
    { vendors: z.array(z.string()).default(["Stripe", "Adyen"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["KYC", "Fraud", "Global Coverage", "Developer Experience"]))
  );

  server.tool(
    "compare_fraud",
    "Create a deterministic markdown comparison table for fraud tools.",
    { vendors: z.array(z.string()).default(["Stripe", "Adyen"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["Fraud", "Risk", "Developer Experience", "Global Coverage"]))
  );

  server.tool(
    "compare_local_payment_methods",
    "Create a deterministic comparison table for local payment methods.",
    { vendors: z.array(z.string()).default(["dLocal", "Rapyd"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["Local Payments", "Coverage", "Complexity", "Developer Experience"]))
  );

  server.tool(
    "compare_embedded_finance",
    "Create a deterministic comparison table for embedded finance providers.",
    { vendors: z.array(z.string()).default(["Stripe", "Adyen"]) },
    async ({ vendors }) => text(buildComparison(vendors, ["Embedded Finance", "Treasury", "Stablecoin", "Developer Experience"]))
  );
}
