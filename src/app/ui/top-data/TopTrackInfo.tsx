'use client';

import { TopTrackItem } from '@/hooks/useFetchTopTracks';
import styles from './TopTrackInfo.module.css';
import Image from 'next/image';
import { SpotifyIcon } from '@/icons/SpotifyIcon';

type TopTrackInfoProps = {
  ref?: React.RefObject<HTMLDivElement | null>;
} & Omit<TopTrackItem, 'id'>;

export const TopTrackInfo = ({ ref, album, name, artists, external_urls }: TopTrackInfoProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.topTrackInfo} ref={ref}>
        <Image className={styles.artwork} src={album.images[0].url} width={250} height={250} alt={album.name} />
        <span className={styles.text}>
          <div className={styles.song}>{name}</div>
          <div className={styles.artist}>
            {artists.reduce((artists: string, artist, i: number) => (artists += (i ? ', ' : '') + artist.name), '')}
          </div>
        </span>
        <a href={external_urls.spotify} className={styles.play} target="_blank" rel="noopener noreferrer">
          <SpotifyIcon width={20} fill="currentColor" /> Play on Spotify
        </a>
      </div>
    </div>
  );
};
