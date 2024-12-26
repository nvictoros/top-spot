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
      Your top{' '}
      <select
        className={styles.select}
        onChange={({ currentTarget }) => {
          onTypeChange(currentTarget.value as TopDataTypes);
        }}
        defaultValue={defaultType}
      >
        <option value={TopDataTypes.Tracks}>tracks</option>
        <option value={TopDataTypes.Artists}>artists</option>
      </select>{' '}
      of the last{' '}
      <select
        className={styles.select}
        onChange={({ currentTarget }) => {
          onTimeRangeChange(currentTarget.value as TopDataTimeRange);
        }}
        defaultValue={defaultTimeRange}
      >
        <option value={TopDataTimeRange.Short}>4 weeks</option>
        <option value={TopDataTimeRange.Medium}>6 months</option>
        <option value={TopDataTimeRange.Long}>12 months</option>
      </select>
    </div>
  );
};
