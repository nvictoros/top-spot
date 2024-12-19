import { auth } from '@/auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    const session = await auth();
    const type = (await params).type;
    const searchParams = request.nextUrl.searchParams;
    const time_range = searchParams.get('time_range');

    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=50&offset=0`,
      {
        headers: { Authorization: 'Bearer ' + session?.access_token },
      },
    );

    if (!response.ok) {
      return new Response(`Non 200 response fetching top data: ${response.statusText}`, { status: response.status });
    }

    const data = await response.json();

    return Response.json({ data });
  } catch (error) {
    return new Response(`Error fetching top data: ${error?.toString()}`, { status: 500 });
  }
}
