import DownloadButton from '@/components/DownloadButton/DownloadButton';
import { useOS } from '@/hooks/useOS';
import { getOSLabel, getOtherOS, type DownloadSource } from '@/utils/download';

interface Props {
  source: DownloadSource;
  className?: string;
  otherPlatform?: boolean;
}

export default function MoviesTvDownloadButton({ source, className, otherPlatform = false }: Props) {
  const { downloadOS } = useOS();
  const targetOS = otherPlatform ? getOtherOS(downloadOS) : downloadOS;

  return (
    <DownloadButton
      source={source}
      forceOS={targetOS}
      label={`${otherPlatform ? 'Get for' : 'Download for'} ${getOSLabel(targetOS)}`}
      variant={otherPlatform ? 'ghost' : 'primary'}
      size='lg'
      showDropdown={false}
      className={className}
    />
  );
}
