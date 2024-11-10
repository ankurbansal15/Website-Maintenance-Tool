import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate performance data dynamically using OpenAI API
const generatePerformanceData = async (website: string, days: number) => {
  const prompt = `Generate or Predict a list of performance metrics for the website ${website} over the past ${days} days. Include values for Load Time (ms), Time to First Byte (ms), First Contentful Paint (ms), Largest Contentful Paint (ms), Cumulative Layout Shift, and First Input Delay (ms) for each day. Ensure that the values vary and make sense in a realistic performance trend. and you have to generate the at all the values.`;

  try {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const generatedText = response.choices[0].text.trim();
    const data = parseGeneratedData(generatedText);
    console.log(data);
    
    return data;
  } catch (error) {
    console.error('Error generating performance data with OpenAI:', error);
    return [];
  }
};

// Parse the OpenAI response into structured data
const parseGeneratedData = (data: any) => {
    return data.map((item: any) => {
      const date = item.date || "";
      const loadTime = item.loadTime ? item.loadTime.trim() : "0";
      const ttfb = item.ttfb ? item.ttfb.trim() : "0";
      const fcp = item.fcp ? item.fcp.trim() : "0";
      const lcp = item.lcp ? item.lcp.trim() : "0";
      const cls = item.cls ? item.cls.trim() : "0";
      const fid = item.fid ? item.fid.trim() : "0";
  
      return {
        date: date.trim(),
        loadTime: parseFloat(loadTime),
        ttfb: parseFloat(ttfb),
        fcp: parseFloat(fcp),
        lcp: parseFloat(lcp),
        cls: parseFloat(cls),
        fid: parseFloat(fid),
      };
    });
  };
  

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { website, timeRange } = body;

    if (!website || !timeRange) {
      return NextResponse.json(
        { error: 'Website and Time Range are required' },
        { status: 400 }
      );
    }

    // Generate dynamic performance data using OpenAI API
    const performanceData = await generatePerformanceData(website, parseInt(timeRange));

    return NextResponse.json(performanceData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
