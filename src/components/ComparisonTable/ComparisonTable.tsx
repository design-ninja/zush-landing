import { Check, X } from 'lucide-react';
import Heading from '@/components/Heading';
import AppleIcon from '@/components/AppleIcon';
import WindowsIcon from '@/components/WindowsIcon';
import type { FeatureCategory } from '@/data/featureContent';
import styles from './ComparisonTable.module.scss';

export interface ComparisonRow {
  tool: string;
  platform: string;
  freeTier: string;
  batchRename: boolean;
  autoMonitor: boolean;
  pricing: string;
  imageFormats?: string;
  rawSupport?: boolean;
  documentFormats?: string;
  pdfExtraction?: boolean;
  screenshotDetect?: boolean;
  exifPreserve?: boolean;
}

const defaultRows: ComparisonRow[] = [
  { tool: 'Zush', platform: 'macOS', freeTier: '50', batchRename: true, autoMonitor: true, pricing: '$10 one-time / 10,000 renames', imageFormats: '22 formats', rawSupport: true, documentFormats: 'PDF, DOCX, XLSX, PPTX, +', pdfExtraction: true, screenshotDetect: true, exifPreserve: true },
  { tool: 'Renamer.ai', platform: 'Mac & Windows', freeTier: '15/m', batchRename: true, autoMonitor: true, pricing: 'From $9.95/mo (200 renames)', imageFormats: '15+ formats', rawSupport: false, documentFormats: 'PDF, DOCX, XLSX, PPT, +', pdfExtraction: true, screenshotDetect: false, exifPreserve: true },
  { tool: 'AI Renamer', platform: 'Mac & Windows', freeTier: '10', batchRename: true, autoMonitor: false, pricing: '$19 one-time or $10/200 renames', imageFormats: 'Common only', rawSupport: false, documentFormats: 'PDF, TXT', pdfExtraction: true, screenshotDetect: false, exifPreserve: true },
  { tool: 'NameQuick', platform: 'macOS', freeTier: 'Trial (50)', batchRename: true, autoMonitor: true, pricing: 'From $5/mo (500 renames) or $38 BYOK', imageFormats: 'Common + HEIF', rawSupport: false, documentFormats: 'PDF, DOCX, XLSX, Pages', pdfExtraction: true, screenshotDetect: false, exifPreserve: true },
  { tool: 'RenameClick', platform: 'Mac & Windows', freeTier: '30/m', batchRename: true, autoMonitor: true, pricing: '$48 lifetime or $8/mo', imageFormats: '11 formats', rawSupport: false, documentFormats: 'PDF, DOCX, TXT, RTF, +', pdfExtraction: false, screenshotDetect: false, exifPreserve: true },
  { tool: 'Riffo', platform: 'macOS', freeTier: 'Free', batchRename: true, autoMonitor: false, pricing: 'Free', imageFormats: 'Common only', rawSupport: false, documentFormats: 'Limited', pdfExtraction: false, screenshotDetect: false, exifPreserve: false },
];

type ColumnDef = {
  key: string;
  label: string;
  render: (row: ComparisonRow, i: number) => React.ReactNode;
};

function getColumnsForCategory(category: FeatureCategory): ColumnDef[] {
  const base: ColumnDef[] = [
    { key: 'tool', label: 'Tool', render: (row) => row.tool },
    { key: 'platform', label: 'Platform', render: (row) => (
      <span className={styles.Comparison__Platform}>
        <AppleIcon />
        {row.platform === 'Mac & Windows' && <WindowsIcon />}
      </span>
    )},
    { key: 'freeTier', label: 'Free Renames', render: (row) => row.freeTier },
    { key: 'batchRename', label: 'Batch Rename', render: (row) => row.batchRename ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' /> },
    { key: 'autoMonitor', label: 'Auto Monitor', render: (row) => row.autoMonitor ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' /> },
  ];

  const categoryColumns: Record<FeatureCategory, ColumnDef[]> = {
    general: [],
    image: [
      { key: 'imageFormats', label: 'Image Formats', render: (row) => row.imageFormats ?? '—' },
      { key: 'rawSupport', label: 'RAW Support', render: (row) => row.rawSupport ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' /> },
    ],
    photo: [
      { key: 'imageFormats', label: 'Photo Formats', render: (row) => row.imageFormats ?? '—' },
      { key: 'rawSupport', label: 'RAW/HEIC', render: (row) => row.rawSupport ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' /> },
      { key: 'exifPreserve', label: 'EXIF Safe', render: (row) => row.exifPreserve ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' /> },
    ],
    screenshot: [
      { key: 'screenshotDetect', label: 'Screenshot Detect', render: (row) => row.screenshotDetect ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' /> },
    ],
    document: [
      { key: 'documentFormats', label: 'Doc Formats', render: (row) => row.documentFormats ?? '—' },
    ],
    pdf: [
      { key: 'documentFormats', label: 'Doc Formats', render: (row) => row.documentFormats ?? '—' },
      { key: 'pdfExtraction', label: 'PDF Text Extract', render: (row) => row.pdfExtraction ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' /> },
    ],
  };

  return [
    ...base,
    ...categoryColumns[category],
    { key: 'pricing', label: 'Pricing', render: (row) => row.pricing },
  ];
}

interface ComparisonTableProps {
  rows?: ComparisonRow[];
  category?: FeatureCategory;
}

const ComparisonTable = ({ rows, category = 'general' }: ComparisonTableProps) => {
  const comparisonRows = rows ?? defaultRows;
  const columns = getColumnsForCategory(category);

  return (
    <section className={styles.Section}>
      <div className={styles.Section__Container}>
        <Heading as='h2' align='center' style={{ marginBottom: '3rem' }}>
          How Zush Compares
        </Heading>
        <div className={styles.ComparisonWrapper}>
          <table className={styles.Comparison}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={i}
                  className={i === 0 ? styles.Comparison__Highlighted : ''}
                >
                  {columns.map((col) => (
                    <td key={col.key}>{col.render(row, i)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
