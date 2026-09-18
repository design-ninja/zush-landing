import { useEffect, useState } from 'react';
import { detectFromUA, readPreferredOS, type OS } from '@/utils/detectOS';
export type { OS } from '@/utils/detectOS';

export interface UseOSResult {
  os: OS;
  /** Whether detection has finished on the client. False during SSR / first paint. */
  detected: boolean;
  /** Whether the current value came from an explicit user choice (localStorage). */
  manual: boolean;
  /** Resolved download-target OS: never 'mobile' / 'unknown', falls back to 'mac'. */
  downloadOS: 'mac' | 'windows';
}

export function useOS(): UseOSResult {
  // SSR / first render: Mac as default (per product decision).
  const [os, setOS] = useState<OS>('mac');
  const [detected, setDetected] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const preferred = readPreferredOS();
    if (preferred) {
      setOS(preferred);
      setManual(true);
      setDetected(true);
      return;
    }
    setOS(detectFromUA());
    setDetected(true);
  }, []);

  const downloadOS: 'mac' | 'windows' = os === 'windows' ? 'windows' : 'mac';

  return { os, detected, manual, downloadOS };
}
