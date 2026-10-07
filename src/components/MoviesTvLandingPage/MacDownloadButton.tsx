import { lazy, Suspense, useState } from 'react';
import AppleIcon from '@/components/AppleIcon';
import { DOWNLOAD_URL } from '@/constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { DownloadSource } from '@/utils/download';

const MobileDownloadModal = lazy(() => import('@/components/MobileDownloadModal'));

// The page's primary download button. Movies & TV is Mac-only, so it always
// points at the Mac download; phones get the same send-to-desktop modal as the
// shared DownloadButton. Click tracking comes from the data-download-* attrs.
interface Props {
  source: DownloadSource;
  label?: string;
  className?: string;
}

const MacDownloadButton = ({ source, label = 'Download for Mac', className }: Props) => {
  const isMobile = useIsMobile();
  const [hasLoadedModal, setHasLoadedModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <a
        className={className}
        href={DOWNLOAD_URL}
        data-download-os='mac'
        data-download-source={source}
        data-download-channel='direct'
        onClick={(event) => {
          if (!isMobile) return;
          event.preventDefault();
          setHasLoadedModal(true);
          setIsModalOpen(true);
        }}
      >
        <AppleIcon />
        <span>{label}</span>
      </a>
      {hasLoadedModal && (
        <Suspense fallback={null}>
          <MobileDownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default MacDownloadButton;
