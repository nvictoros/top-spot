'use client';

import { TopDataTimeRange } from '@/service/topData.types';
import { useFetchTopArtists } from '@/hooks/useFetchTopArtists';
import styles from './TopArtists.module.css';
import Image from 'next/image';
import { Loading } from '../components/Loading';

export const TopArtists = ({ timeRange }: { timeRange: TopDataTimeRange }) => {
  const { isLoading, error, topData } = useFetchTopArtists({ timeRange });

  return (
    <div>
      {isLoading ? <Loading /> : null}
      {error ? `Uh oh, error: ${error.toString()}` : null}
      {topData ? (
        <ul className={styles.topArtists}>
          {topData.items.map(({ name, id, images }, index: number) => (
            <li key={id} className={styles.topArtist}>
              <div className={styles.index}>{index + 1}</div>
              <Image src={images[0].url} width={40} height={40} alt={name} />
              {name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
