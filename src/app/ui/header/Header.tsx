'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu } from '../menu/Menu';

type HeaderProps = {
  onSignOutClick: () => void;
};

export const Header = ({ onSignOutClick }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocClick = (event: MouseEvent) => {
      if (event.target instanceof Element) {
        if (!menuRef.current?.contains(event.target)) {
          if (showMenu) {
            setShowMenu(false);
            event.stopPropagation();
          }
        }
      }
    };

    document.body.addEventListener('click', handleDocClick);

    return () => {
      document.body.removeEventListener('click', handleDocClick);
    };
  }, [showMenu]);

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
      {showMenu && createPortal(<Menu onSignOutClick={onSignOutClick} ref={menuRef} />, document.body)}
    </header>
  );
};
