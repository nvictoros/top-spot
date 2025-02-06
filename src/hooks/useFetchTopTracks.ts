'use client';

import { TopDataTimeRange, TopDataTypes } from '../service/topData.types';
import { fetchTopData } from '@/service/topData';
import { SWRConfiguration } from 'swr';
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
  onError,
}: {
  timeRange: TopDataTimeRange;
  onError?: SWRConfiguration['onError'];
}): {
  error: unknown;
  isLoading: boolean;
  topData: TopTracksData | null;
} => {
  const {
    error,
    isLoading,
    data: topData,
  } = useSWRImmutable(['/top/tracks', timeRange], () => fetchTopData(TopDataTypes.Tracks, timeRange), { onError });

  return { error, isLoading, topData };
};
