import { Button } from "@/components/ui/button";
import { Wallet, Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Zap className="h-8 w-8 text-primary animate-pulse" />
            <div className="absolute inset-0 h-8 w-8 text-primary blur-md opacity-50">
              <Zap className="h-8 w-8" />
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
            QIE-Mind
          </span>
          <span className="ml-2 text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-full">
            TESTNET
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Chain ID: 1983</span>
          </div>
          <Button variant="outline" className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
