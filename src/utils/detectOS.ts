export type OS = 'mac' | 'windows' | 'mobile' | 'unknown';

export function detectFromUA(): OS {
  if (typeof navigator === 'undefined') return 'mac';
  const uaData = (navigator as Navigator & {
    userAgentData?: { platform?: string; mobile?: boolean };
  }).userAgentData;
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

export function readPreferredOS(): OS | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem('zush-preferred-os');
    if (stored === 'mac' || stored === 'windows') return stored;
  } catch {
    // Storage can be disabled or blocked.
  }
  return null;
}
