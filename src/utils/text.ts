export function text(content: string) {
  return {
    content: [
      {
        type: "text" as const,
        text: content
      }
    ]
  };
}
