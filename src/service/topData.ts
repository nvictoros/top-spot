import { TopDataTimeRange, TopDataTypes } from '@/service/topData.types';

export const fetchTopData = async (type: TopDataTypes, timeRange: TopDataTimeRange) => {
  try {
    const response = await fetch(`/api/top/${type}?time_range=${timeRange}`);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Non 200 response ${response.status} ${text}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Error fetching Spotify data: ${error}`);
  }
};
