'use client';

import { TopDataTimeRange } from '@/service/topData.types';
import { useFetchTopArtists } from '@/hooks/useFetchTopArtists';
import styles from './TopArtists.module.css';
import Image from 'next/image';
import { Loading } from '../components/Loading';

export const TopArtists = ({ timeRange }: { timeRange: TopDataTimeRange }) => {
  const { isLoading, error, topData } = useFetchTopArtists({ timeRange });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return `Uh oh, error: ${error.toString()}`;
  }

  return (
    <div>
      {topData ? (
        <ul className={styles.topArtists}>
          {topData.items.map(({ name, id, images }, index: number) => (
            <li key={id} className={styles.topArtist}>
              <div className={styles.index}>{index + 1}</div>
              <Image className={styles.artwork} src={images[0].url} width={45} height={45} alt={name} />
              {name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
