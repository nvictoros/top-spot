import { useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { useOutsideInteraction } from '@/hooks/useOutsideInteraction';

type ModalProps = {
  children: React.ReactElement;
  container?: HTMLElement;
  onClose: () => void;
};

export const Modal = ({ children, container = document.body, onClose }: ModalProps) => {
  const modalElementRef = useRef<HTMLDivElement | null>(null);

  useOutsideInteraction({
    ref: modalElementRef,
    events: ['click'],
    handler: (event) => {
      onClose();
      event.stopPropagation();
    },
  });

  return createPortal(
    <div className={styles.modal}>
      <div ref={modalElementRef} className={styles.modalContent}>
        {children}
      </div>
    </div>,
    container,
  );
};
