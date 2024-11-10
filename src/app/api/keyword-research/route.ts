// src/app/api/keyword-research/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface KeywordResult {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
}

async function generateKeywords(keyword: string): Promise<KeywordResult[]> {
  const prompt = `Generate a list of related keywords for "${keyword}" with estimated metrics.`;
  
  try {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const keywords = response.choices[0].text
      ?.split('\n')
      .filter(Boolean)
      .map((item) => item.trim())
      .map((kw) => ({
        keyword: kw,
        volume: Math.floor(Math.random() * 5000) + 1000,
        difficulty: Math.floor(Math.random() * 100),
        cpc: parseFloat((Math.random() * 5).toFixed(2)),
      }));

    return keywords || [];
  } catch (error) {
    console.error('Error generating keywords:', error);
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword } = body;

    if (!keyword) {
      return NextResponse.json(
        { error: 'Keyword is required' },
        { status: 400 }
      );
    }

    const results = await generateKeywords(keyword);
    return NextResponse.json(results);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}