import OpenAI from 'openai';
import { buildPrompt } from './prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getAiRecommendations(query, products) {
  const prompt = buildPrompt(query, products);

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const raw = chatResponse.choices?.[0]?.message?.content || '';

    // Remove the code block markers and trim whitespace
    const clean = raw
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    console.log('Cleaned GPT response:', clean);

    return JSON.parse(clean);
  } catch (error) {
    console.error('[AI ERROR]', error);
    throw new Error('Failed to fetch AI recommendations');
  }
}
