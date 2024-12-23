'use client';

import { TopDataTimeRange } from '@/service/topData.types';
import { useFetchTopTracks } from '@/hooks/useFetchTopTracks';
import styles from './TopTracks.module.css';
import Image from 'next/image';

export const TopTracks = ({ timeRange }: { timeRange: TopDataTimeRange }) => {
  const { isLoading, error, topData } = useFetchTopTracks({ timeRange });

  return (
    <>
      {isLoading ? 'Loading!' : null}
      {error ? `Uh oh, error: ${error.toString()}` : null}
      {topData ? (
        <ul className={styles.topTracks}>
          {topData.items.map(({ name, artists, id, album }, index: number) => (
            <li key={id} className={styles.topTrack}>
              <div className={styles.index}>{index + 1}</div>
              <Image src={album.images[0].url} width={40} height={40} alt={album.name} />
              <span className={styles.text}>
                <div className={styles.song}>{name}</div>
                <div className={styles.artist}>
                  {artists.reduce(
                    (artists: string, artist, i: number) => (artists += (i ? ', ' : '') + artist.name),
                    '',
                  )}
                </div>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
