'use client';

import { useState } from 'react';

import { TopTracks } from './TopTracks';
import { TopArtists } from './TopArtists';
import { TopDataTimeRange, TopDataTypes } from '@/service/topData.types';

export const TopData = () => {
  const [timeRange, setTimeRange] = useState(TopDataTimeRange.Medium);
  const [type, setType] = useState<TopDataTypes>(TopDataTypes.Tracks);

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
      <button
        disabled={type === TopDataTypes.Tracks}
        onClick={() => {
          setType(TopDataTypes.Tracks);
          setTimeRange(TopDataTimeRange.Medium);
        }}
      >
        TOP TRACKS
      </button>
      <button
        disabled={type === TopDataTypes.Artists}
        onClick={() => {
          setType(TopDataTypes.Artists);
          setTimeRange(TopDataTimeRange.Medium);
        }}
      >
        TOP ARTISTS
      </button>

      {type === TopDataTypes.Tracks ? <TopTracks timeRange={timeRange} /> : <TopArtists timeRange={timeRange} />}
    </>
  );
};
