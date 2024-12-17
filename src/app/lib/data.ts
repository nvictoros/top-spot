import { auth } from '@/auth';

export enum TopDataType {
  Artists = 'artists',
  Tracks = 'tracks',
}

export enum TopDataTimeRange {
  Short = 'short_term',
  Medium = 'medium_term',
  Long = 'long_term',
}

export const fetchTopData = async (type: TopDataType, timeRange: TopDataTimeRange) => {
  try {
    const session = await auth();

    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=50&offset=0`,
      {
        headers: { Authorization: 'Bearer ' + session?.access_token },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Non 200 response ${response.status} ${text}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching Spotify data: ${error}`);
  }
};
