'use client';

import { useState } from 'react';

import { TopTracks } from './TopTracks';
import { TopArtists } from './TopArtists';
import { TopDataTypes } from '@/hooks/topData.types';

export const TopData = () => {
  const [type, setType] = useState<TopDataTypes>(TopDataTypes.Tracks);

  return (
    <>
      <button disabled={type === TopDataTypes.Tracks} onClick={() => setType(TopDataTypes.Tracks)}>
        TOP TRACKS
      </button>
      <button disabled={type === TopDataTypes.Artists} onClick={() => setType(TopDataTypes.Artists)}>
        TOP ARTISTS
      </button>

      {type === TopDataTypes.Tracks ? <TopTracks /> : <TopArtists />}
    </>
  );
};
