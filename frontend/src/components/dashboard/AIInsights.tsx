import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Insight {
  type: 'opportunity' | 'risk' | 'trend';
  message: string;
}

interface TradingInsights {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidenceScore: number;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  insights: Insight[];
  summary: string;
}

const mockMarketData = {
  qiePrice: 0.45,
  btcPrice: 98200,
  goldPrice: 2650,
  volume24h: 1250000,
  priceChange24h: 5.4,
};

export function AIInsights() {
  const [insights, setInsights] = useState<TradingInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('trading-insights', {
        body: { marketData: mockMarketData }
      });

      if (error) throw error;
      
      if (data.error) {
        throw new Error(data.error);
      }

      setInsights(data);
      toast({
        title: 'AI Analysis Complete',
        description: 'Trading insights have been updated.',
      });
    } catch (error) {
      console.error('Error fetching insights:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to generate insights',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-emerald-400';
      case 'bearish': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getRecommendationVariant = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'default';
      case 'SELL': return 'destructive';
      default: return 'secondary';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="h-4 w-4 text-emerald-400" />;
      case 'risk': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <TrendingUp className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          AI Trading Insights
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchInsights}
          disabled={isLoading}
          className="h-8"
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </CardHeader>
      <CardContent>
        {!insights ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Click Analyze to generate AI trading insights</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary & Recommendation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {insights.sentiment === 'bullish' ? (
                  <TrendingUp className={`h-5 w-5 ${getSentimentColor(insights.sentiment)}`} />
                ) : insights.sentiment === 'bearish' ? (
                  <TrendingDown className={`h-5 w-5 ${getSentimentColor(insights.sentiment)}`} />
                ) : (
                  <TrendingUp className={`h-5 w-5 ${getSentimentColor(insights.sentiment)}`} />
                )}
                <span className={`font-semibold capitalize ${getSentimentColor(insights.sentiment)}`}>
                  {insights.sentiment}
                </span>
                <span className="text-muted-foreground text-sm">
                  ({insights.confidenceScore}% confidence)
                </span>
              </div>
              <Badge variant={getRecommendationVariant(insights.recommendation)}>
                {insights.recommendation}
              </Badge>
            </div>

            {/* Summary */}
            <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3">
              {insights.summary}
            </p>

            {/* Insights List */}
            <div className="space-y-2">
              {insights.insights.map((insight, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 text-sm bg-background/50 rounded p-2"
                >
                  {getInsightIcon(insight.type)}
                  <span className="text-foreground">{insight.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
