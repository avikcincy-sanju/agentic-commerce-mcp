export interface VendorComparisonInput {
  title: string;
  vendors: string[];
  metrics: string[];
  values: Record<string, string[]>;
}

function normalizeValues(values: string[]) {
  return values.map((value) => value.trim());
}

export function compareVendorSet(input: VendorComparisonInput): string {
  const header = [`| Feature | ${input.vendors.join(" | ")} |`, `| --- | ${input.vendors.map(() => "---").join(" | ")} |`];
  const rows = input.metrics.map((metric, index) => {
    const values = normalizeValues(input.vendors.map((vendor) => input.values[vendor]?.[index] ?? "N/A"));
    return `| ${metric} | ${values.join(" | ")} |`;
  });
  return [
    `## ${input.title}`,
    ...header,
    ...rows,
    ""
  ].join("\n");
}
