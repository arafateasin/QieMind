import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Wallet } from "lucide-react";

const holdings = [
  { token: "QIE", amount: "5,234.50", value: "$2,355.53", allocation: 45 },
  { token: "USDT", amount: "3,500.00", value: "$3,500.00", allocation: 35 },
  { token: "XAU (Gold)", amount: "0.85", value: "$2,252.50", allocation: 20 },
];

const Portfolio = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <PieChart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Portfolio</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Holdings */}
        <Card className="bg-card border-border rounded-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.map((holding, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-sm border border-border"
                >
                  <div className="space-y-1">
                    <p className="font-mono font-semibold text-foreground">{holding.token}</p>
                    <p className="text-xs text-muted-foreground">{holding.amount} tokens</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-semibold text-accent">{holding.value}</p>
                    <p className="text-xs text-muted-foreground">{holding.allocation}% allocation</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allocation Visual */}
        <Card className="bg-card border-border rounded-sm">
          <CardHeader>
            <CardTitle>Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.map((holding, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{holding.token}</span>
                    <span className="font-mono text-foreground">{holding.allocation}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${holding.allocation}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
