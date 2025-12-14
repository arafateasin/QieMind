import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, DollarSign, Bot } from "lucide-react";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Value Locked */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Value Locked
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">$12,450.32</div>
          <p className="text-xs text-muted-foreground mt-1">
            +2.1% from last hour
          </p>
        </CardContent>
      </Card>

      {/* 24h PnL */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            24h PnL
          </CardTitle>
          <ArrowUp className="h-4 w-4 text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-emerald-400">+5.4%</span>
            <ArrowUp className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            +$672.54 realized gains
          </p>
        </CardContent>
      </Card>

      {/* Active Agents */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Agents
          </CardTitle>
          <Bot className="h-4 w-4 text-violet-400" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
            <span className="text-2xl font-bold text-foreground">RUNNING</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            3 agents monitoring markets
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsGrid;
