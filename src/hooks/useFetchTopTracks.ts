'use client';

import { useEffect, useState } from 'react';
import { TopDataTimeRange, TopDataTypes } from '../service/topData.types';
import { fetchTopData } from '@/service/topData';

type TopTrackAlbum = {
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
};

export type TopTrackItem = {
  name: string;
  artists: { name: string }[];
  id: string;
  album: TopTrackAlbum;
};

export type TopTracksData = {
  items: TopTrackItem[];
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

    fetchTopData(TopDataTypes.Tracks, timeRange)
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
