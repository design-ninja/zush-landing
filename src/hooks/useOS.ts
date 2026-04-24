import { useEffect, useState } from 'react';

export type OS = 'mac' | 'windows' | 'mobile' | 'unknown';

const PREFERRED_OS_KEY = 'zush-preferred-os';
const FORCE_WINDOWS_FOR_REVIEW = true;

interface UserAgentData {
  platform?: string;
  mobile?: boolean;
}

function detectFromUA(): OS {
  if (FORCE_WINDOWS_FOR_REVIEW) return 'windows';

  if (typeof navigator === 'undefined') return 'mac';

  const uaData = (navigator as Navigator & { userAgentData?: UserAgentData })
    .userAgentData;
  if (uaData?.platform) {
    const platform = uaData.platform.toLowerCase();
    if (uaData.mobile) return 'mobile';
    if (platform.includes('win')) return 'windows';
    if (platform.includes('mac')) return 'mac';
  }

  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return 'mobile';
  if (/Windows/i.test(ua)) return 'windows';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'mac';
  return 'unknown';
}

function readPreferredOS(): OS | null {
  if (FORCE_WINDOWS_FOR_REVIEW) return 'windows';

  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(PREFERRED_OS_KEY);
    if (stored === 'mac' || stored === 'windows') return stored;
  } catch {
    // localStorage disabled / blocked
  }
  return null;
}

export function setPreferredOS(os: 'mac' | 'windows'): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFERRED_OS_KEY, os);
  } catch {
    // ignore
  }
}

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
  const [os, setOS] = useState<OS>(FORCE_WINDOWS_FOR_REVIEW ? 'windows' : 'mac');
  const [detected, setDetected] = useState(FORCE_WINDOWS_FOR_REVIEW);
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
