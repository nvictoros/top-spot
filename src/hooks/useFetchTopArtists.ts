'use client';

import { TopDataTimeRange, TopDataTypes } from '../service/topData.types';
import { fetchTopData } from '@/service/topData';
import useSWRImmutable from 'swr/immutable';

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
  const {
    error,
    isLoading,
    data: topData,
  } = useSWRImmutable(['/top/artists', timeRange], () => fetchTopData(TopDataTypes.Artists, timeRange));

  return { error, isLoading, topData };
};
