import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

type ModalProps = {
  children: React.ReactElement;
  container?: HTMLElement;
  onClose: () => void;
};

export const Modal = ({ children, container = document.body, onClose }: ModalProps) => {
  const modalElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Element) {
        if (!modalElementRef.current?.contains(event.target)) {
          onClose();
          event.stopPropagation();
        }
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.modal}>
      <div ref={modalElementRef} className={styles.modalContent}>
        {children}
      </div>
    </div>,
    container,
  );
};
