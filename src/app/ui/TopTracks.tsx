'use client';

import { useState } from 'react';
import { useFetchTopTracks } from '@/hooks/useFetchTopTracks';
import { TopDataTimeRange } from '@/hooks/topData.types';

export const TopTracks = () => {
  const [timeRange, setTimeRange] = useState(TopDataTimeRange.Medium);

  const { isLoading, error, topData } = useFetchTopTracks({ timeRange });

  return (
    <>
      <button disabled={timeRange === TopDataTimeRange.Short} onClick={() => setTimeRange(TopDataTimeRange.Short)}>
        SHORT
      </button>
      <button disabled={timeRange === TopDataTimeRange.Medium} onClick={() => setTimeRange(TopDataTimeRange.Medium)}>
        MEDIUM
      </button>
      <button disabled={timeRange === TopDataTimeRange.Long} onClick={() => setTimeRange(TopDataTimeRange.Long)}>
        LONG
      </button>
      {isLoading && 'Loading!'}
      {error && `Uh oh, error: ${error}`}
      {topData && (
        <ul>
          {topData.items.map(({ name, artists, id }, index: number) => (
            <li key={id}>
              {index + 1}. {name} |{' '}
              {artists.reduce((artists, artist, i) => (artists += (i ? ', ' : '') + artist.name), '')}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
