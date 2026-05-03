import Hero, { type HeroProps } from './Hero';
import HeroRenameDemo from '../HeroRenameDemo';
import type { RenameDemoCopy } from '@/i18n/copy';
import type { Locale } from '@/i18n/config';

interface HeroWithRenameDemoProps extends Omit<HeroProps, 'showcase' | 'mobileShowcase'> {
  renameDemo: RenameDemoCopy;
  locale?: Locale;
}

const HeroWithRenameDemo = ({
  renameDemo,
  downloadLabel = 'Download',
  downloadMenu,
  locale,
  forceOS,
  ...heroProps
}: HeroWithRenameDemoProps) => (
  <Hero
    {...heroProps}
    downloadLabel={downloadLabel}
    downloadMenu={downloadMenu}
    forceOS={forceOS}
    showcase={(
      <HeroRenameDemo
        copy={renameDemo}
        downloadLabel={downloadLabel}
        downloadMenu={downloadMenu}
        locale={locale}
        forceOS={forceOS}
      />
    )}
  />
);

export default HeroWithRenameDemo;
