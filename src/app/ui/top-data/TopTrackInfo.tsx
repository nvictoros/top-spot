'use client';

import { useEffect, useState } from 'react';
import { TopTrackItem } from '@/hooks/useFetchTopTracks';
import styles from './TopTrackInfo.module.css';
import Image from 'next/image';
import { SpotifyIcon } from '@/icons/SpotifyIcon';
import { Vibrant } from 'node-vibrant/browser';
import { Palette } from '@vibrant/color';

type TopTrackInfoProps = {
  ref?: React.RefObject<HTMLDivElement | null>;
} & Omit<TopTrackItem, 'id'>;

export const TopTrackInfo = ({ ref, album, name, artists, external_urls }: TopTrackInfoProps) => {
  const [palette, setPalette] = useState<Palette | null>(null);
  const albumImageUrl = album.images[0].url;

  useEffect(() => {
    if (albumImageUrl) {
      Vibrant.from(albumImageUrl)
        .getPalette()
        .then((palette) => setPalette(palette));
    }
  }, [albumImageUrl]);

  return (
    palette && (
      <div className={styles.overlay}>
        <div
          className={styles.topTrackInfo}
          style={{ background: `linear-gradient(${palette?.Vibrant?.hex}, ${palette?.DarkMuted?.hex})  ` }}
          ref={ref}
        >
          <Image className={styles.artwork} src={albumImageUrl} width={250} height={250} alt={album.name} />
          <span className={styles.text}>
            <div className={styles.song}>{name}</div>
            <div className={styles.artist}>
              {artists.reduce((artists: string, artist, i: number) => (artists += (i ? ', ' : '') + artist.name), '')}
            </div>
          </span>
          <a
            style={{ backgroundColor: palette?.Vibrant?.hex }}
            href={external_urls.spotify}
            className={styles.play}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SpotifyIcon width={20} fill="currentColor" /> Play on Spotify
          </a>
        </div>
      </div>
    )
  );
};
