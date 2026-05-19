const VERSION_RE = /##\s*\[(\d+\.\d+\.\d+)\]/;

export function parseLatestVersion(markdown: string): string | null {
  const match = markdown.match(VERSION_RE);
  return match ? match[1] : null;
}
