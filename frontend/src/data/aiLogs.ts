export const AI_LOGS = [
  { type: 'info', msg: 'Connecting to QIE Node (RPC: testnetqierpc1.digital)...' },
  { type: 'success', msg: 'Connection Established. Latency: 12ms' },
  { type: 'info', msg: 'Loading Smart Contract: 0x742d...44e' },
  { type: 'process', msg: 'Agent "ALPHA-1" Initialized.' },
  { type: 'process', msg: 'Scanning QIEDEX Order Book...' },
  { type: 'info', msg: 'Oracle Update: Gold (XAU) = $2034.50' },
  { type: 'warning', msg: 'Volatility Detected in QIE/USDT pair.' },
  { type: 'action', msg: 'DECISION: Buy Signal Confidence 87%.' },
  { type: 'success', msg: 'TX SENT: Swapping 500 USDT -> QIE' },
  { type: 'success', msg: 'TX CONFIRMED: Block #88291 (Gas: 0.00001 QIE)' },
  { type: 'info', msg: 'Portfolio Rebalanced. Waiting for next tick...' },
  { type: 'process', msg: 'Scanning QIEDEX for arbitrage opportunities...' },
  { type: 'info', msg: 'Fetching Gold price from QIE Native Oracle...' },
  { type: 'action', msg: 'ANALYSIS: QIE Volume spiking (Bullish).' },
  { type: 'process', msg: 'Calculated Spread: 0.04%. Executing Flash Loan.' },
  { type: 'success', msg: 'Verification: Transaction confirmed in block #45882.' },
];

export const getRandomLog = () => {
  const randomIndex = Math.floor(Math.random() * AI_LOGS.length);
  return AI_LOGS[randomIndex];
};

export const getLogColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-emerald-400';
    case 'warning':
      return 'text-amber-400';
    case 'action':
      return 'text-cyan-400';
    case 'process':
      return 'text-violet-400';
    case 'info':
    default:
      return 'text-slate-400';
  }
};
