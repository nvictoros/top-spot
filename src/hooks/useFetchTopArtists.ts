'use client';

import { useEffect, useState } from 'react';
import { TopDataTimeRange } from './topData.types';

export type TopArtistItem = {
  name: string;
  id: string;
};

export type TopArtistsData = {
  items: TopArtistItem[];
};

const fetchTopArtists = async (timeRange: TopDataTimeRange) => {
  try {
    const response = await fetch(`/api/top/artists?time_range=${timeRange}`, { cache: 'default' });

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

export const useFetchTopArtists = ({
  timeRange,
}: {
  timeRange: TopDataTimeRange;
}): {
  error: unknown;
  isLoading: boolean;
  topData: TopArtistsData | null;
} => {
  const [topData, setTopData] = useState<null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setTopData(null);

    fetchTopArtists(timeRange)
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
