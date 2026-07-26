export interface ComparisonRow {
  tool: string;
  bestFor: string;
  gap: string;
}

export interface ComparisonTableProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  headers?: {
    tool?: string;
    bestFor?: string;
    gap?: string;
  };
  rows: ComparisonRow[];
}
