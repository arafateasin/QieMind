# QIE-Mind AI Trading Agent

🤖 An autonomous AI trading bot for the QIE Blockchain

## Features

- ✅ 24/7 automated trading execution
- ✅ Real-time market signal analysis
- ✅ On-chain trade execution via smart contract
- ✅ Matrix-style colored logging
- ✅ Cloud-ready deployment (Camber)
- ✅ Secure secret management

## Tech Stack

- **Language:** Python 3.9
- **Blockchain:** QIE Testnet
- **Web3 Library:** web3.py
- **Cloud:** Camber Cloud (GitHub Student Pack)

## Quick Start

### Local Testing

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure environment
# Edit .env and add your CONTRACT_ADDRESS

# 3. Run the agent
python agent.py
```

### Cloud Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete Camber Cloud deployment instructions.

## Configuration

| Variable           | Description                | Example                         |
| ------------------ | -------------------------- | ------------------------------- |
| `RPC_URL`          | QIE Testnet RPC endpoint   | https://testnetqierpc1.digital/ |
| `PRIVATE_KEY`      | Wallet private key (no 0x) | 062d35f5...                     |
| `CONTRACT_ADDRESS` | Deployed vault contract    | 0x123456...                     |
| `LOOP_INTERVAL`    | Seconds between trades     | 15                              |

## Project Structure

```
ai-agent/
├── agent.py              # Main bot logic
├── requirements.txt      # Python dependencies
├── camber.yaml          # Camber deployment config
├── .env                 # Local environment variables
├── DEPLOYMENT.md        # Deployment guide
└── README.md           # This file
```

## How It Works

1. **Market Analysis:** Simulates AI analysis of trading pairs
2. **Signal Generation:** Determines BUY/SELL signals with confidence scores
3. **Trade Execution:** If confidence > 70%, executes trade on-chain
4. **Transaction Logging:** Prints clickable transaction links
5. **Loop:** Sleeps for configured interval and repeats

## Transaction Links

All transactions are logged with clickable links:

```
🔗 View: https://testnet.qie.digital/tx/0xABC123...
```

## License

MIT

## Support

- QIE Docs: https://docs.qie.digital/
- Telegram: https://t.me/HovRonQiblockchain
- Discord: https://discord.com/invite/9HCNTyqkwa
