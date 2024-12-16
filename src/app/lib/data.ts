import { auth } from '@/auth';

export const fetchSpotify = async () => {
  try {
    const session = await auth();
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0', {
      headers: { Authorization: 'Bearer ' + session?.accessToken },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Non 200 response ${response.status} ${text}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching Spotify data: ${error}`);
  }
};
