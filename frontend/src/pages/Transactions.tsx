import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { List, ExternalLink } from "lucide-react";

const transactions = [
  {
    hash: "0x7f3a...9b2e",
    type: "Buy",
    amount: "500 QIE",
    value: "$225.00",
    gas: "0.0001 QIE",
    status: "Confirmed",
    block: "#8,992,102",
    time: "2 min ago",
  },
  {
    hash: "0x4e2d...1c8f",
    type: "Sell",
    amount: "200 USDT",
    value: "$200.00",
    gas: "0.0001 QIE",
    status: "Confirmed",
    block: "#8,992,095",
    time: "15 min ago",
  },
  {
    hash: "0x9a1b...5d3e",
    type: "Swap",
    amount: "100 QIE → USDT",
    value: "$45.00",
    gas: "0.0002 QIE",
    status: "Confirmed",
    block: "#8,992,088",
    time: "32 min ago",
  },
  {
    hash: "0x2c4f...8a7b",
    type: "Buy",
    amount: "0.05 XAU",
    value: "$132.50",
    gas: "0.0001 QIE",
    status: "Confirmed",
    block: "#8,992,072",
    time: "1 hr ago",
  },
];

const Transactions = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <List className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <Card className="bg-card border-border rounded-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-sm border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className={`rounded-sm ${
                      tx.type === "Buy"
                        ? "border-accent/50 text-accent"
                        : tx.type === "Sell"
                        ? "border-destructive/50 text-destructive"
                        : "border-primary/50 text-primary"
                    }`}
                  >
                    {tx.type}
                  </Badge>
                  <div className="space-y-1">
                    <p className="font-mono text-sm text-foreground">{tx.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.hash} • Block {tx.block}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-mono text-sm text-foreground">{tx.value}</p>
                    <p className="text-xs text-muted-foreground">Gas: {tx.gas}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-accent/50 text-accent text-xs">
                      {tx.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{tx.time}</p>
                  </div>
                  <a
                    href={`https://testnet.qie.digital/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
