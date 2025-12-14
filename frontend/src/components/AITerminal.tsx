import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Terminal, Cpu } from "lucide-react";
import { getRandomLog, getLogColor } from "@/data/aiLogs";

interface LogEntry {
  id: number;
  timestamp: string;
  type: string;
  message: string;
}

const AITerminal = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: "10:00:01",
      type: "info",
      message: "System initialized on QIE Testnet (ChainID: 1983)",
    },
    {
      id: 2,
      timestamp: "10:00:05",
      type: "success",
      message: "Oracle Connection: STABLE",
    },
    {
      id: 3,
      timestamp: "10:00:07",
      type: "process",
      message: "Waiting for market events...",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(4);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = getRandomLog();
      const now = new Date();
      const timestamp = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setLogs((prev) => [
        ...prev.slice(-50), // Keep last 50 logs
        {
          id: idRef.current++,
          timestamp,
          type: newLog.type,
          message: newLog.msg,
        },
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="bg-slate-950 border-border/50 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-mono">AI Activity Log</CardTitle>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 font-mono text-xs">
          <Cpu className="h-3 w-3" />
          ALPHA-1
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-[300px]" ref={scrollRef}>
          <div className="p-4 font-mono text-xs space-y-1.5">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-2 leading-relaxed">
                <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                <span className={getLogColor(log.type)}>{log.message}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-slate-500">
              <span className="animate-pulse">▌</span>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AITerminal;
