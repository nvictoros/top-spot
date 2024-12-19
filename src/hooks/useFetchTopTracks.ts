'use client';

import { useEffect, useState } from 'react';
import { TopDataTimeRange } from './topData.types';

export type TopTrackItem = {
  name: string;
  artists: { name: string }[];
  id: string;
};

export type TopTracksData = {
  items: TopTrackItem[];
};

const fetchTopData = async (timeRange: TopDataTimeRange) => {
  try {
    const response = await fetch(`/api/top/tracks?time_range=${timeRange}`, { cache: 'default' });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Non 200 response ${response.status} ${text}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Error fetching Spotify data: ${error}`);
  }
};

export const useFetchTopTracks = ({
  timeRange,
}: {
  timeRange: TopDataTimeRange;
}): {
  error: unknown;
  isLoading: boolean;
  topData: TopTracksData | null;
} => {
  const [topData, setTopData] = useState<null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setTopData(null);

    fetchTopData(timeRange)
      .then((data) => {
        setTopData(data);
      })
      .catch((error: unknown) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [timeRange]);

  return { error, isLoading, topData };
};
