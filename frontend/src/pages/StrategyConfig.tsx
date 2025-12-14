import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Settings2, Activity, Zap } from "lucide-react";

const oracleFeeds = [
  { pair: "QIE / USDT", source: "QIE Native Oracle", status: "Active" },
  { pair: "Gold / USDT", source: "QIE Native Oracle", status: "Active" },
  { pair: "BTC / USDT", source: "QIE Native Oracle", status: "Active" },
];

const StrategyConfig = () => {
  const [maxAllocation, setMaxAllocation] = useState([25]);
  const [stopLoss, setStopLoss] = useState(true);
  const [takeProfit, setTakeProfit] = useState(true);
  const [targetApy, setTargetApy] = useState("25");
  const { toast } = useToast();

  const handleUpdateParameters = () => {
    toast({
      title: "Parameters Updated",
      description: "Parameters synced to on-chain vault.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings2 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Strategy Configuration</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Parameters */}
        <Card className="bg-card border-border rounded-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Risk Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Max Allocation Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground">Max Allocation per Trade</Label>
                <span className="font-mono text-primary">{maxAllocation[0]}%</span>
              </div>
              <Slider
                value={maxAllocation}
                onValueChange={setMaxAllocation}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            {/* Stop-Loss Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Stop-Loss Protection</Label>
                <p className="text-xs text-muted-foreground">Automatically exit positions at 5% loss</p>
              </div>
              <Switch checked={stopLoss} onCheckedChange={setStopLoss} />
            </div>

            {/* Take-Profit Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Take-Profit Automation</Label>
                <p className="text-xs text-muted-foreground">Lock in gains at target thresholds</p>
              </div>
              <Switch checked={takeProfit} onCheckedChange={setTakeProfit} />
            </div>

            {/* Target APY Input */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Target Annual Yield (APY)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={targetApy}
                  onChange={(e) => setTargetApy(e.target.value)}
                  className="font-mono bg-input border-border"
                />
                <span className="text-muted-foreground">%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Oracle Feeds */}
        <Card className="bg-card border-border rounded-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Oracle Feeds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {oracleFeeds.map((feed, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-sm border border-border"
                >
                  <div className="space-y-1">
                    <p className="font-mono font-medium text-foreground">{feed.pair}</p>
                    <p className="text-xs text-muted-foreground">Source: {feed.source}</p>
                  </div>
                  <Badge variant="outline" className="border-accent/50 text-accent gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {feed.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleUpdateParameters}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-sm"
        >
          UPDATE AGENT PARAMETERS
        </Button>
      </div>
    </div>
  );
};

export default StrategyConfig;
