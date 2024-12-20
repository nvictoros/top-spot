'use client';

import { TopDataTimeRange } from '@/service/topData.types';
import { useFetchTopArtists } from '@/hooks/useFetchTopArtists';

export const TopArtists = ({ timeRange }: { timeRange: TopDataTimeRange }) => {
  const { isLoading, error, topData } = useFetchTopArtists({ timeRange });

  return (
    <div>
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
