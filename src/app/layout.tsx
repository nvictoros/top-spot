'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import { Themes } from './ui/types/theme.types';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isThemeSet, setIsThemeSet] = useState(false);

  useEffect(() => {
    try {
      const theme = window.localStorage.getItem('theme');
      document.documentElement.className = theme || Themes.OSDefault;
    } catch (e) {
      console.warn('Unable to read theme from localStorage', e);
      document.documentElement.className = Themes.OSDefault;
    } finally {
      setIsThemeSet(true);
    }
  }, []);

  return (
    <html lang="en">
      <body>{isThemeSet && children}</body>
    </html>
  );
}
