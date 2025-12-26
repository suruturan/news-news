import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const q = searchParams.get('q') || '';

  if (!NEWS_API_KEY) {
    return NextResponse.json(
      { error: 'NEWS_API_KEY is not configured' },
      { status: 500 }
    );
  }

  try {
    const url = new URL('https://newsapi.org/v2/top-headlines');
    url.searchParams.append('country', 'us');
    url.searchParams.append('pageSize', '10');
    url.searchParams.append('page', page);
    url.searchParams.append('apiKey', NEWS_API_KEY);
    
    if (q) {
      url.searchParams.append('q', q);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('NewsAPI error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch news' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
