'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type HeaderProps = {
  onSignOutClick: () => void;
};

export const Header = ({ onSignOutClick }: HeaderProps) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>TopSpot</h1>
      <div className={styles.profile}>
        <Image
          onClick={() => setShowSubMenu((show) => !show)}
          className={styles.avatar}
          alt=""
          width={50}
          height={50}
          src={session?.user?.image || ''}
        />
        <div className={showSubMenu ? styles.subMenu : styles.hiddenSubMenu}>
          <button className={styles.signOut} onClick={onSignOutClick}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};
