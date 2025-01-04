'use client';

import { TopDataTimeRange } from '@/service/topData.types';
import { useFetchTopTracks } from '@/hooks/useFetchTopTracks';
import styles from './TopTracks.module.css';
import Image from 'next/image';
import { Loading } from '../components/Loading';
import { MoreIcon } from '@/icons/MoreIcon';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TopTrackInfo } from './TopTrackInfo';

export const TopTracks = ({ timeRange }: { timeRange: TopDataTimeRange }) => {
  const [showMoreTrackId, setShowMoreTrackId] = useState<string | null>(null);
  const { isLoading, error, topData } = useFetchTopTracks({ timeRange });
  const showMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocClick = (event: MouseEvent) => {
      if (event.target instanceof Element) {
        if (!showMoreRef.current?.contains(event.target)) {
          if (showMoreTrackId) {
            setShowMoreTrackId(null);
            event.stopPropagation();
          }
        }
      }
    };

    document.body.addEventListener('click', handleDocClick);

    return () => {
      document.body.removeEventListener('click', handleDocClick);
    };
  }, [showMoreTrackId]);

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
              <button onClick={() => setShowMoreTrackId(id)} className={styles.more}>
                <MoreIcon fill="currentColor" />
              </button>
            </li>
          ))}
        </ul>
      }
      {showMoreTrack
        ? createPortal(
            <TopTrackInfo
              external_urls={showMoreTrack.external_urls}
              ref={showMoreRef}
              album={showMoreTrack.album}
              name={showMoreTrack.name}
              artists={showMoreTrack.artists}
            />,
            document.body,
          )
        : null}
    </>
  );
};
