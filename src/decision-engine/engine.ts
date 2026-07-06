export interface DecisionNode {
  label: string;
  result?: string;
  children?: DecisionNode[];
}

export interface DecisionTreeInput {
  title: string;
  question: string;
  yesLabel?: string;
  yesBranch?: DecisionNode[];
  noLabel?: string;
  noBranch?: DecisionNode[];
  metadata?: Record<string, string>;
}

export interface DecisionTreeOutput {
  title: string;
  question: string;
  ascii: string;
  mermaid: string;
  plantuml: string;
}

function renderAscii(nodes: DecisionNode[], indent = "", prefix = ""): string[] {
  const lines: string[] = [];
  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    const connector = isLast ? "└── " : "├── ";
    lines.push(`${indent}${prefix}${connector}${node.label}`);
    if (node.result) {
      lines.push(`${indent}${prefix}${isLast ? "    " : "│   "}└── ${node.result}`);
    }
    if (node.children && node.children.length > 0) {
      const childIndent = `${indent}${prefix}${isLast ? "    " : "│   "}`;
      lines.push(...renderAscii(node.children, childIndent, ""));
    }
  });
  return lines;
}

export function buildDecisionTree(input: DecisionTreeInput): DecisionTreeOutput {
  const yesNodes = input.yesBranch ?? [];
  const noNodes = input.noBranch ?? [];
  const asciiLines = [
    input.title,
    input.question,
    ...renderAscii([{ label: input.yesLabel ?? "YES", children: yesNodes }, { label: input.noLabel ?? "NO", children: noNodes }])
  ];

  const mermaid = [
    "flowchart TD",
    `A["${input.question}"] -->|YES| B["${input.yesLabel ?? "YES"}" ]`,
    `A -->|NO| C["${input.noLabel ?? "NO"}" ]`
  ].join("\n");

  const plantuml = [
    "@startuml",
    "start",
    `: ${input.question};`,
    "if (YES) then (yes)",
    `: ${input.yesLabel ?? "YES"};`,
    "else (no)",
    `: ${input.noLabel ?? "NO"};`,
    "endif",
    "stop",
    "@enduml"
  ].join("\n");

  return {
    title: input.title,
    question: input.question,
    ascii: asciiLines.join("\n"),
    mermaid,
    plantuml
  };
}
