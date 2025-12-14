import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const routeNames: Record<string, string> = {
  "/": "Overview",
  "/portfolio": "Portfolio",
  "/strategy": "Strategy Config",
  "/transactions": "Transactions",
};

export function TopHeader() {
  const location = useLocation();
  const currentRoute = routeNames[location.pathname] || "Dashboard";

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Dashboard</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{currentRoute}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline" className="border-accent/50 text-accent gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Gas: 0.00001 QIE
        </Badge>
        <ConnectButton 
          chainStatus="icon"
          showBalance={false}
        />
      </div>
    </header>
  );
}
