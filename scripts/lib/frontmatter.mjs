// Reads one scalar from a Markdown/MDX file's YAML frontmatter without a YAML
// dependency. Double-quoted values are JSON-compatible in this repo, single
// quotes use YAML's '' escape, anything else is taken as written.
export function frontmatterValue(source, key) {
  const raw = source.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))?.[1];
  if (!raw) return undefined;
  if (raw.startsWith('"')) return JSON.parse(raw);
  if (raw.startsWith("'")) return raw.slice(1, -1).replaceAll("''", "'");
  return raw;
}
