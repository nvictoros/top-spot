'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { Themes } from '../types/theme.types';

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

    document.body.addEventListener('pointerdown', handleDocClick);

    return () => {
      document.body.removeEventListener('pointerdown', handleDocClick);
    };
  }, [showSubMenu]);

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>TopSpot</h1>
      <div>
        <Image
          onClick={() => setShowSubMenu((show) => !show)}
          className={styles.avatar}
          alt=""
          width={50}
          height={50}
          src={session?.user?.image || ''}
        />
      </div>
      <div ref={subMenuRef} className={showSubMenu ? styles.subMenu : `${styles.subMenu} ${styles.hiddenSubMenu}`}>
        <div className={styles.subMenuProfile}>
          <Image
            onClick={() => setShowSubMenu((show) => !show)}
            className={styles.avatar}
            alt=""
            width={50}
            height={50}
            src={session?.user?.image || ''}
          />
          <div>
            <p className={styles.name}>{session?.user?.name}</p>
            <p className={styles.email}>{session?.user?.email}</p>
          </div>
        </div>
        <div className={styles.subMenuItem}>
          Theme:{' '}
          <select
            onChange={({ target }) => {
              document.documentElement.className = target.value;
              window.localStorage.setItem('theme', target.value);
            }}
            defaultValue={window.localStorage.getItem('theme') || Themes.OSDefault}
          >
            <option value={Themes.OSDefault}>OS default</option>
            <option value={Themes.Light}>Light</option>
            <option value={Themes.Dark}>Dark</option>
          </select>
        </div>
        <button className={styles.subMenuItem} onClick={onSignOutClick}>
          Log Out
        </button>
      </div>
    </header>
  );
};
