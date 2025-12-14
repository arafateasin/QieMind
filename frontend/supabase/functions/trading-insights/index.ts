import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MarketData {
  qiePrice: number;
  btcPrice: number;
  goldPrice: number;
  volume24h: number;
  priceChange24h: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { marketData } = await req.json() as { marketData: MarketData };
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert AI trading analyst for QIE-Mind, a decentralized hedge fund on the QIE Blockchain. 
Analyze the provided market data and generate actionable trading insights.

Your response must be in JSON format with this structure:
{
  "sentiment": "bullish" | "bearish" | "neutral",
  "confidenceScore": number (0-100),
  "recommendation": "BUY" | "SELL" | "HOLD",
  "insights": [
    { "type": "opportunity" | "risk" | "trend", "message": "string" }
  ],
  "summary": "Brief 1-2 sentence summary of market conditions"
}

Be concise but insightful. Focus on actionable intelligence.`;

    const userPrompt = `Analyze this market data for QIE trading:
- QIE Price: $${marketData.qiePrice}
- BTC Price: $${marketData.btcPrice}
- Gold Price: $${marketData.goldPrice}
- 24h Volume: $${marketData.volume24h.toLocaleString()}
- 24h Price Change: ${marketData.priceChange24h > 0 ? '+' : ''}${marketData.priceChange24h}%

Generate trading insights and recommendations.`;

    console.log('Calling Lovable AI Gateway for trading insights...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response from the AI
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    const insights = JSON.parse(jsonMatch[0]);
    console.log('Trading insights generated successfully');

    return new Response(JSON.stringify(insights), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in trading-insights function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
