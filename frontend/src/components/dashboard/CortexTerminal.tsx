import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";
import { getRandomTerminalLog, getLogTypeColor } from "@/data/simulationData";

interface LogEntry {
  id: number;
  time: string;
  type: string;
  msg: string;
}

export function CortexTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, time: '10:01', type: 'INFO', msg: 'Scanning QIEDEX Orderbook...' },
    { id: 2, time: '10:02', type: 'INFO', msg: 'Oracle Price (Gold): $2031.50' },
    { id: 3, time: '10:03', type: 'ACTION', msg: 'OPPORTUNITY DETECTED: Spread > 0.5%' },
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(4);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = getRandomTerminalLog();
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      setLogs((prev) => [
        ...prev.slice(-30),
        {
          id: idRef.current++,
          time,
          type: newLog.type,
          msg: newLog.msg,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="bg-background border-border rounded-sm h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2 py-3 border-b border-border">
        <Terminal className="h-4 w-4 text-primary" />
        <CardTitle className="text-sm font-mono text-primary">CORTEX TERMINAL</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden bg-background">
        <ScrollArea className="h-[300px]" ref={scrollRef}>
          <div className="p-4 font-mono text-xs space-y-1">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-2 leading-relaxed">
                <span className="text-muted-foreground shrink-0">[{log.time}]</span>
                <span className={getLogTypeColor(log.type)}>{log.msg}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 text-accent">
              <span className="animate-pulse">▌</span>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
