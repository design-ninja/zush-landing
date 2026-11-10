import type { APIRoute } from 'astro';
import { CSV_ROWS, toCsv } from '@/data/fileRenamingIndex';

export const GET: APIRoute = () =>
  new Response(toCsv(CSV_ROWS), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'inline; filename="zush-file-renaming-index-2026.csv"',
    },
  });
