import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp } from "lucide-react";

const generateChartData = (live: boolean) => {
  const baseValue = 10000;
  const data = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const volatility = live ? Math.random() * 500 : Math.random() * 200;
    const trend = live ? (23 - i) * 80 : (23 - i) * 40;
    const value = baseValue + trend + volatility - 100;
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: Math.round(value * 100) / 100,
    });
  }
  
  return data;
};

const PortfolioChart = () => {
  const [isLive, setIsLive] = useState(true);
  const [chartData, setChartData] = useState(generateChartData(true));

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setChartData(prev => {
          const newData = [...prev.slice(1)];
          const lastValue = prev[prev.length - 1].value;
          const change = (Math.random() - 0.3) * 100;
          newData.push({
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: Math.round((lastValue + change) * 100) / 100,
          });
          return newData;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const handleModeChange = (live: boolean) => {
    setIsLive(live);
    setChartData(generateChartData(live));
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg font-semibold">Portfolio Performance</CardTitle>
          {isLive && (
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant={isLive ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeChange(true)}
            className={isLive ? "bg-primary hover:bg-primary/90" : ""}
          >
            <Activity className="h-4 w-4 mr-1" />
            Live
          </Button>
          <Button
            variant={!isLive ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeChange(false)}
            className={!isLive ? "bg-violet-600 hover:bg-violet-700" : ""}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Backtest
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PortfolioChart;
