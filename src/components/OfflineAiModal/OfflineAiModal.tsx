import { useEffect, useId, useRef } from 'react';
import { CloudOff, HardDrive, RefreshCw, ShieldCheck, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './OfflineAiModal.module.scss';

export interface OfflineAiModalCopy {
  title: string;
  description: string;
  points: string[];
  proTitle: string;
  proDescription: string;
  closeLabel: string;
}

interface OfflineAiModalProps {
  copy: OfflineAiModalCopy;
  isOpen: boolean;
  onClose: () => void;
}

const pointIcons = [HardDrive, CloudOff, RefreshCw];

const OfflineAiModal = ({ copy, isOpen, onClose }: OfflineAiModalProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.OfflineAiModal__Overlay} role='presentation' onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className={styles.OfflineAiModal__Content}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type='button'
          className={styles.OfflineAiModal__Close}
          aria-label={copy.closeLabel}
          onClick={onClose}
        >
          <X aria-hidden='true' />
        </button>

        <span className={styles.OfflineAiModal__Icon} aria-hidden='true'>
          <ShieldCheck />
        </span>
        <Heading as='h2' size='h3' id={titleId} className={styles.OfflineAiModal__Title}>
          {copy.title}
        </Heading>
        <Text id={descriptionId} color='subtle' className={styles.OfflineAiModal__Description}>
          {copy.description}
        </Text>

        <ul className={styles.OfflineAiModal__Points}>
          {copy.points.map((point, index) => {
            const PointIcon = pointIcons[index % pointIcons.length];
            return (
              <li key={point}>
                <span className={styles.OfflineAiModal__PointIcon} aria-hidden='true'>
                  <PointIcon />
                </span>
                <Text as='span' size='sm'>{point}</Text>
              </li>
            );
          })}
        </ul>

        <div className={styles.OfflineAiModal__ProNotice}>
          <Text className={styles.OfflineAiModal__ProTitle}>{copy.proTitle}</Text>
          <Text size='sm' color='subtle'>{copy.proDescription}</Text>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default OfflineAiModal;
