import { NextResponse } from 'next/server';
import { getAiRecommendations, getAiRecommendationsStream } from '../../../lib/openai';

export async function POST(request) {
  const { query, products, useStream = false } = await request.json();

  try {
    if (useStream) {
      const stream = await getAiRecommendationsStream(query, products);

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    const results = await getAiRecommendations(query, products);
    console.log('🔍 IA responded with:', results);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('[AI ERROR]', error);
    return NextResponse.json({ error: 'AI recommendation failed' }, { status: 500 });
  }
}
