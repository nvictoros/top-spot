'use client';

import { useState } from 'react';

import { TopTracks } from './TopTracks';
import { TopArtists } from './TopArtists';
import { TopDataControls } from './TopDataControls';
import { TopDataTimeRange, TopDataTypes } from '@/service/topData.types';
import styles from './TopData.module.css';

export const TopData = () => {
  const [timeRange, setTimeRange] = useState(TopDataTimeRange.Medium);
  const [type, setType] = useState<TopDataTypes>(TopDataTypes.Tracks);

  return (
    <div className={styles.topData}>
      <TopDataControls
        onTypeChange={setType}
        onTimeRangeChange={setTimeRange}
        defaultTimeRange={TopDataTimeRange.Medium}
        defaultType={TopDataTypes.Tracks}
      />

      {type === TopDataTypes.Tracks ? <TopTracks timeRange={timeRange} /> : <TopArtists timeRange={timeRange} />}
    </div>
  );
};
