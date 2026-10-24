// Keep dollar-quoted PL/pgSQL bodies intact when sending migrations over Neon HTTP.
export const sqlStatements = (source: string) => {
  const statements: string[] = [];
  let current = "";
  let quote = "";
  let dollar = "";
  let comment = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (comment) {
      if (c === "\n") {
        comment = false;
        current += "\n";
      }
      continue;
    }
    if (dollar) {
      if (source.startsWith(dollar, i)) {
        current += dollar;
        i += dollar.length - 1;
        dollar = "";
      } else current += c;
      continue;
    }
    if (quote) {
      current += c;
      if (c === quote) {
        if (source[i + 1] === quote) {
          current += source[++i];
        } else quote = "";
      }
      continue;
    }
    if (c === "-" && source[i + 1] === "-") {
      comment = true;
      i++;
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      current += c;
      continue;
    }
    const tag =
      c === "$" ? source.slice(i).match(/^\$[a-zA-Z_0-9]*\$/)?.[0] : undefined;
    if (tag) {
      dollar = tag;
      current += tag;
      i += tag.length - 1;
      continue;
    }
    if (c === ";") {
      if (current.trim()) statements.push(current.trim());
      current = "";
    } else current += c;
  }
  if (current.trim()) statements.push(current.trim());
  return statements;
};
