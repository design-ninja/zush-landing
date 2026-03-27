import { Check, X } from 'lucide-react';
import Heading from '@/components/Heading';
import AppleIcon from '@/components/AppleIcon';
import WindowsIcon from '@/components/WindowsIcon';
import styles from './ComparisonTable.module.scss';

export interface ComparisonRow {
  tool: string;
  platform: string;
  freeTier: string;
  batchRename: boolean;
  autoMonitor: boolean;
  pricing: string;
}

const defaultRows: ComparisonRow[] = [
  { tool: 'Zush', platform: 'macOS', freeTier: '50', batchRename: true, autoMonitor: true, pricing: '$10 one-time / 10,000 renames' },
  { tool: 'Renamer.ai', platform: 'Mac & Windows', freeTier: '15/m', batchRename: true, autoMonitor: true, pricing: 'From $9.95/mo (200 renames)' },
  { tool: 'AI Renamer', platform: 'Mac & Windows', freeTier: '10', batchRename: true, autoMonitor: false, pricing: '$19 one-time or $10/200 renames' },
  { tool: 'NameQuick', platform: 'macOS', freeTier: '50', batchRename: true, autoMonitor: true, pricing: 'From $5/mo (500 renames) or $38 BYOK' },
  { tool: 'RenameClick', platform: 'Mac & Windows', freeTier: '30/m', batchRename: true, autoMonitor: true, pricing: '$48 lifetime or $8/mo' },
  { tool: 'Riffo', platform: 'macOS', freeTier: 'Limited', batchRename: true, autoMonitor: false, pricing: 'Freemium' },
];

interface ComparisonTableProps {
  rows?: ComparisonRow[];
}

const ComparisonTable = ({ rows }: ComparisonTableProps) => {
  const comparisonRows = rows ?? defaultRows;

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
                <th>Tool</th>
                <th>Platform</th>
                <th>Free Renames</th>
                <th>Batch Rename</th>
                <th>Auto Monitor</th>
                <th>Pricing</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={i}
                  className={i === 0 ? styles.Comparison__Highlighted : ''}
                >
                  <td>{row.tool}</td>
                  <td>
                    <span className={styles.Comparison__Platform}>
                      <AppleIcon />
                      {row.platform === 'Mac & Windows' && <WindowsIcon />}
                    </span>
                  </td>
                  <td>{row.freeTier}</td>
                  <td>{row.batchRename ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' />}</td>
                  <td>{row.autoMonitor ? <Check size={18} color='#22c55e' /> : <X size={18} color='#9ca3af' />}</td>
                  <td>{row.pricing}</td>
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
