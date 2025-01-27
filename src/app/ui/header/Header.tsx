'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { Menu } from '../components/Menu';
import { Modal } from '../components/Modal';

type HeaderProps = {
  onSignOutClick: () => void;
};

export const Header = ({ onSignOutClick }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>TopSpot</h1>
      <Image
        onClick={() => setShowMenu((show) => !show)}
        role="button"
        className={styles.avatar}
        alt=""
        width={50}
        height={50}
        src={session?.user?.image || ''}
      />
      {showMenu && (
        <Modal
          onClose={() => {
            if (showMenu) {
              setShowMenu(false);
            }
          }}
        >
          <Menu onSignOutClick={onSignOutClick} ref={menuRef} />
        </Modal>
      )}
    </header>
  );
};
