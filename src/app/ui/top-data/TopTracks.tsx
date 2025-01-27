'use client';

import { TopDataTimeRange } from '@/service/topData.types';
import { useFetchTopTracks } from '@/hooks/useFetchTopTracks';
import styles from './TopTracks.module.css';
import Image from 'next/image';
import { Loading } from '../components/Loading';
import { MoreIcon } from '@/icons/MoreIcon';
import { useState } from 'react';
import { TopTrackInfo } from './TopTrackInfo';
import { Modal } from '../components/Modal';

export const TopTracks = ({ timeRange }: { timeRange: TopDataTimeRange }) => {
  const [showMoreTrackId, setShowMoreTrackId] = useState<string | null>(null);
  const { isLoading, error, topData } = useFetchTopTracks({ timeRange });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return `Uh oh, error: ${error.toString()}`;
  }

  const showMoreTrack = topData?.items.find(({ id }) => id === showMoreTrackId);

  return (
    <>
      {
        <ul className={styles.topTracks}>
          {topData?.items.map(({ name, artists, id, album }, index: number) => (
            <li key={id} className={styles.topTrack}>
              <div className={styles.index}>{index + 1}</div>
              <Image className={styles.artwork} src={album.images[0].url} width={45} height={45} alt={album.name} />
              <span className={styles.text}>
                <div className={styles.song}>{name}</div>
                <div className={styles.artist}>
                  {artists.reduce(
                    (artists: string, artist, i: number) => (artists += (i ? ', ' : '') + artist.name),
                    '',
                  )}
                </div>
              </span>
              <button aria-label="more" onClick={() => setShowMoreTrackId(id)} className={styles.more}>
                <MoreIcon fill="currentColor" />
              </button>
            </li>
          ))}
        </ul>
      }
      {showMoreTrack ? (
        <Modal onClose={() => setShowMoreTrackId(null)}>
          <TopTrackInfo
            external_urls={showMoreTrack.external_urls}
            album={showMoreTrack.album}
            name={showMoreTrack.name}
            artists={showMoreTrack.artists}
          />
        </Modal>
      ) : null}
    </>
  );
};
