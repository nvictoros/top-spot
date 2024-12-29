'use client';

import { TopDataTimeRange, TopDataTypes } from '../service/topData.types';
import { fetchTopData } from '@/service/topData';
import useSWRImmutable from 'swr/immutable';

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
  external_urls: {
    spotify: string;
  };
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
  const {
    error,
    isLoading,
    data: topData,
  } = useSWRImmutable(['/top/tracks', timeRange], () => fetchTopData(TopDataTypes.Tracks, timeRange));

  return { error, isLoading, topData };
};
