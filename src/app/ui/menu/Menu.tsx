'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Menu.module.css';
import { Themes } from '../types/theme.types';
import { useSession } from 'next-auth/react';

type MenuProps = {
  ref?: React.RefObject<HTMLDivElement | null>;
  onSignOutClick: () => void;
};

export const Menu = ({ ref, onSignOutClick }: MenuProps) => {
  const { data: session } = useSession();

  return (
    <div className={styles.menu} ref={ref}>
      <div className={styles.menuProfile}>
        <Image className={styles.avatar} alt="" width={50} height={50} src={session?.user?.image || ''} />
        <div>
          <p className={styles.name}>{session?.user?.name}</p>
          <p className={styles.email}>{session?.user?.email}</p>
        </div>
      </div>
      <div className={styles.menuItem}>
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
      <button onClick={onSignOutClick}>Log Out</button>
    </div>
  );
};
