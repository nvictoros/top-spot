'use client';

import { useEffect, useState } from 'react';
import { TopDataTimeRange, TopDataTypes } from '../service/topData.types';
import { fetchTopData } from '@/service/topData';

export type TopArtistItem = {
  name: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
};

export type TopArtistsData = {
  items: TopArtistItem[];
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

    fetchTopData(TopDataTypes.Artists, timeRange)
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
