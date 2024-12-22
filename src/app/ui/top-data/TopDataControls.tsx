'use client';

import { TopDataTimeRange, TopDataTypes } from '@/service/topData.types';
import styles from './TopDataControls.module.css';

type TopDataControlsType = {
  onTypeChange: (type: TopDataTypes) => void;
  onTimeRangeChange: (timeRange: TopDataTimeRange) => void;
  defaultType: TopDataTypes;
  defaultTimeRange: TopDataTimeRange;
};

export const TopDataControls = ({
  onTypeChange,
  onTimeRangeChange,
  defaultType,
  defaultTimeRange,
}: TopDataControlsType) => {
  return (
    <div className={styles.topDataControls}>
      Your{' '}
      <select
        onChange={({ currentTarget }) => {
          onTypeChange(currentTarget.value as TopDataTypes);
        }}
        defaultValue={defaultType}
      >
        <option value={TopDataTypes.Tracks}>top tracks</option>
        <option value={TopDataTypes.Artists}>top artists</option>
      </select>{' '}
      from the{' '}
      <select
        onChange={({ currentTarget }) => {
          onTimeRangeChange(currentTarget.value as TopDataTimeRange);
        }}
        defaultValue={defaultTimeRange}
      >
        <option value={TopDataTimeRange.Short}>last 4 weeks</option>
        <option value={TopDataTimeRange.Medium}>last 6 months</option>
        <option value={TopDataTimeRange.Long}>last 12 months</option>
      </select>
    </div>
  );
};
