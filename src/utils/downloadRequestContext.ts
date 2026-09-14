import Bowser from 'bowser';

export function getDownloadRequestContext(userAgent: string | undefined) {
  if (!userAgent?.trim()) return {};

  const { browser, os, platform } = Bowser.parse(userAgent);
  const browserName = browser.name === 'Safari' && os.name === 'iOS'
    ? 'Mobile Safari'
    : browser.name;
  const deviceType = platform.type === 'mobile' ? 'Mobile'
    : platform.type === 'tablet' ? 'Tablet'
    : platform.type === 'desktop' ? 'Desktop'
    : undefined;
  const browserVersion = Number.parseFloat(browser.version ?? '');

  return {
    $browser: browserName || undefined,
    $browser_version: Number.isFinite(browserVersion) ? browserVersion : undefined,
    $os: os.name === 'macOS' ? 'Mac OS X' : os.name || undefined,
    $os_version: os.version || undefined,
    $device_type: deviceType,
    request_context_source: 'user_agent',
  };
}
