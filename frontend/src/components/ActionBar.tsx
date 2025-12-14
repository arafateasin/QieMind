import { Button } from "@/components/ui/button";
import { Play, Pause, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ActionBar = () => {
  const [isRunning, setIsRunning] = useState(true);
  const { toast } = useToast();

  const handleStart = () => {
    setIsRunning(true);
    toast({
      title: "AI Agents Started",
      description: "All trading agents are now active and monitoring markets.",
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    toast({
      title: "AI Agents Paused",
      description: "Trading operations have been temporarily suspended.",
      variant: "default",
    });
  };

  const handleEmergencyWithdraw = () => {
    toast({
      title: "Emergency Withdraw Initiated",
      description: "All positions are being closed. Funds returning to wallet.",
      variant: "destructive",
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-xl border border-border rounded-sm shadow-2xl shadow-black/50">
        <Button
          onClick={handleStart}
          disabled={isRunning}
          className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 rounded-sm"
        >
          <Play className="h-4 w-4" />
          Start AI
        </Button>
        
        <Button
          onClick={handlePause}
          disabled={!isRunning}
          variant="outline"
          className="gap-2 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500 disabled:opacity-50 rounded-sm"
        >
          <Pause className="h-4 w-4" />
          Pause
        </Button>
        
        <div className="w-px h-8 bg-border" />
        
        <Button
          onClick={handleEmergencyWithdraw}
          variant="outline"
          className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive rounded-sm"
        >
          <AlertTriangle className="h-4 w-4" />
          EMERGENCY WITHDRAW
        </Button>
      </div>
    </div>
  );
};

export default ActionBar;
