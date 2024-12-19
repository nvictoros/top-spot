'use client';

import { useState } from 'react';
import { useFetchTopArtists } from '@/hooks/useFetchTopArtists';
import { TopDataTimeRange } from '@/hooks/topData.types';

export const TopArtists = () => {
  const [timeRange, setTimeRange] = useState(TopDataTimeRange.Medium);

  const { isLoading, error, topData } = useFetchTopArtists({ timeRange });

  return (
    <div>
      <button disabled={timeRange === TopDataTimeRange.Short} onClick={() => setTimeRange(TopDataTimeRange.Short)}>
        SHORT
      </button>
      <button disabled={timeRange === TopDataTimeRange.Medium} onClick={() => setTimeRange(TopDataTimeRange.Medium)}>
        MEDIUM
      </button>
      <button disabled={timeRange === TopDataTimeRange.Long} onClick={() => setTimeRange(TopDataTimeRange.Long)}>
        LONG
      </button>
      {isLoading ? 'Loading!' : null}
      {error ? `Uh oh, error: ${error.toString()}` : null}
      {topData ? (
        <ul>
          {topData.items.map(({ name, id }, index: number) => (
            <li key={id}>
              {index + 1}. {name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
