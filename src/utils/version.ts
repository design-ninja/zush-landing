const VERSION_RE = /^##\s*\[(\d+(?:\.\d+){2,})\]/m;

export function parseLatestVersion(markdown: string): string | null {
  const match = markdown.match(VERSION_RE);
  return match ? match[1] : null;
}
