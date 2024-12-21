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
      <button
        disabled={type === TopDataTypes.Tracks}
        onClick={() => {
          setType(TopDataTypes.Tracks);
          setTimeRange(TopDataTimeRange.Medium);
        }}
      >
        Top Tracks
      </button>
      <button
        disabled={type === TopDataTypes.Artists}
        onClick={() => {
          setType(TopDataTypes.Artists);
          setTimeRange(TopDataTimeRange.Medium);
        }}
      >
        Top Artists
      </button>
      <br />
      <button disabled={timeRange === TopDataTimeRange.Short} onClick={() => setTimeRange(TopDataTimeRange.Short)}>
        Short
      </button>
      <button disabled={timeRange === TopDataTimeRange.Medium} onClick={() => setTimeRange(TopDataTimeRange.Medium)}>
        Medium
      </button>
      <button disabled={timeRange === TopDataTimeRange.Long} onClick={() => setTimeRange(TopDataTimeRange.Long)}>
        Long
      </button>
      <br />

      {type === TopDataTypes.Tracks ? <TopTracks timeRange={timeRange} /> : <TopArtists timeRange={timeRange} />}
    </>
  );
};
