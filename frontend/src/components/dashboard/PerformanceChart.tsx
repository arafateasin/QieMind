import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const generateChartData = () => {
  const data = [];
  const baseValue = 10000;
  
  for (let i = 0; i < 7; i++) {
    const dayName = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    const trend = i * 300;
    const volatility = Math.random() * 400 - 200;
    const value = baseValue + trend + volatility;
    
    data.push({
      day: dayName,
      value: Math.round(value * 100) / 100,
    });
  }
  
  return data;
};

export function PerformanceChart() {
  const [chartData, setChartData] = useState(generateChartData());

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev];
        const lastValue = newData[newData.length - 1].value;
        const change = (Math.random() - 0.3) * 50;
        newData[newData.length - 1] = {
          ...newData[newData.length - 1],
          value: Math.round((lastValue + change) * 100) / 100,
        };
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-card border-border rounded-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Portfolio Performance (7D)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160 84% 39%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(160 84% 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              stroke="hsl(215 20% 60%)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215 20% 60%)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(220 20% 8%)', 
                border: '1px solid hsl(220 20% 15%)',
                borderRadius: '2px',
                color: 'hsl(210 40% 98%)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(160 84% 39%)"
              strokeWidth={2}
              fill="url(#colorPerformance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
