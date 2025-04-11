import { NextResponse } from 'next/server';
import { getAiRecommendations } from '../../../lib/openai.js';

export async function POST(request) {
  const { query, products } = await request.json();

  try {
    const results = await getAiRecommendations(query, products);
    console.log('🔍 IA responded with:', results);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('[AI ERROR]', error);
    return NextResponse.json({ error: 'AI recommendation failed' }, { status: 500 });
  }
}
