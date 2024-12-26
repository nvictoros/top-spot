'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

type HeaderProps = {
  onSignOutClick: () => void;
};

export const Header = ({ onSignOutClick }: HeaderProps) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleDocClick = (event: MouseEvent) => {
      if (event.target instanceof Element) {
        if (!subMenuRef.current?.contains(event.target)) {
          if (showSubMenu) setShowSubMenu(false);
        }
      }
    };

    document.body.addEventListener('click', handleDocClick);

    return () => {
      document.body.removeEventListener('click', handleDocClick);
    };
  }, [showSubMenu]);

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>TopSpot</h1>
      <div className={styles.profile} ref={subMenuRef}>
        <Image
          onClick={() => setShowSubMenu((show) => !show)}
          className={styles.avatar}
          alt=""
          width={50}
          height={50}
          src={session?.user?.image || ''}
        />
        <div className={showSubMenu ? styles.subMenu : styles.hiddenSubMenu}>
          <button className={styles.subMenuItem} onClick={onSignOutClick}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};
