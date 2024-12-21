'use client';

import { TopDataTimeRange } from '@/service/topData.types';
import { useFetchTopTracks } from '@/hooks/useFetchTopTracks';

export const TopTracks = ({ timeRange }: { timeRange: TopDataTimeRange }) => {
  const { isLoading, error, topData } = useFetchTopTracks({ timeRange });

  return (
    <>
      {isLoading ? 'Loading!' : null}
      {error ? `Uh oh, error: ${error.toString()}` : null}
      {topData ? (
        <ul>
          {topData.items.map(
            ({ name, artists, id }: { name: string; artists: { name: string }[]; id: string }, index: number) => (
              <li key={id}>
                {index + 1}. {name} |{' '}
                {artists.reduce((artists: string, artist, i: number) => (artists += (i ? ', ' : '') + artist.name), '')}
              </li>
            ),
          )}
        </ul>
      ) : null}
    </>
  );
};
