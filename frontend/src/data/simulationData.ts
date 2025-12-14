export const TERMINAL_LOGS = [
  { time: '10:42:01', type: 'INFO', msg: 'System initialized. Connected to QIE Node (Latency: 12ms).' },
  { time: '10:42:05', type: 'PROCESS', msg: 'Agent Alpha-1: Fetching QIE Native Oracle prices...' },
  { time: '10:42:08', type: 'SUCCESS', msg: 'Oracle Data: BTC ($98,200), GOLD ($2,650), QIE ($0.45).' },
  { time: '10:42:15', type: 'WARNING', msg: 'Volatility Alert: QIEDEX liquidity pool depth decreased by 2%.' },
  { time: '10:42:18', type: 'PROCESS', msg: 'Calculating optimal rebalance strategy...' },
  { time: '10:42:22', type: 'ACTION', msg: 'DECISION: Buy Signal Strong. Preparing Tx.' },
  { time: '10:42:24', type: 'SUCCESS', msg: 'TX SUBMITTED: Hash 0x7f...3a9 (Gas: 0.0001 QIE).' },
  { time: '10:42:27', type: 'SUCCESS', msg: 'TX CONFIRMED: Block #8,992,102.' },
  { time: '10:42:30', type: 'INFO', msg: 'Sleeping for 3 seconds to save compute...' },
  { time: '10:42:33', type: 'PROCESS', msg: 'Scanning QIEDEX Orderbook...' },
  { time: '10:42:36', type: 'INFO', msg: 'Oracle Price (Gold): $2031.50' },
  { time: '10:42:39', type: 'ACTION', msg: 'OPPORTUNITY DETECTED: Spread > 0.5%' },
  { time: '10:42:42', type: 'SUCCESS', msg: 'Executing Buy: 500 QIE' },
];

export const getRandomTerminalLog = () => {
  const randomIndex = Math.floor(Math.random() * TERMINAL_LOGS.length);
  return TERMINAL_LOGS[randomIndex];
};

export const getLogTypeColor = (type: string) => {
  switch (type) {
    case 'SUCCESS':
      return 'text-accent';
    case 'WARNING':
      return 'text-yellow-400';
    case 'ACTION':
      return 'text-primary';
    case 'PROCESS':
      return 'text-violet-400';
    case 'INFO':
    default:
      return 'text-muted-foreground';
  }
};
