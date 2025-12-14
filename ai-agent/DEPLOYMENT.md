# QIE-Mind AI Agent Deployment Guide

## 🚀 Camber Cloud Deployment Instructions

### Prerequisites

- Camber CLI installed (`npm install -g @camber/cli` or from GitHub Student Pack)
- Camber account authenticated
- Your smart contract deployed and address ready

---

### Step 1: Install Dependencies Locally (Test First)

```bash
cd c:\Users\user\Documents\BlockChain\ai-agent
pip install -r requirements.txt
```

### Step 2: Test Locally

Update `.env` with your actual contract address, then run:

```bash
python agent.py
```

Press `Ctrl+C` to stop when you confirm it's working.

---

### Step 3: Authenticate with Camber

```bash
camber login
```

Follow the browser authentication flow.

---

### Step 4: Create Secrets (Secure Storage)

**Important:** Never commit private keys to code. Use Camber secrets:

```bash
# Create a secret stash for sensitive data
camber secret create qie-secrets \
  --key private_key \
  --value "062d35f536f2204a0fb67ef30c1623882b67771a3b65b0057ba2735c16df210b"

# Add contract address to the same secret
camber secret update qie-secrets \
  --key contract_address \
  --value "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"
```

**Verify secrets:**

```bash
camber secret list
```

---

### Step 5: Deploy to Camber Cloud

From the `ai-agent` folder:

```bash
# Deploy the job
camber deploy --file camber.yaml

# Alternative: if Camber uses a different command structure
camber job create --config camber.yaml
```

---

### Step 6: Monitor Your Bot

**Check job status:**

```bash
camber job list
```

**View live logs:**

```bash
camber logs qie-trader-bot --follow
```

**Stop the bot:**

```bash
camber job stop qie-trader-bot
```

**Restart the bot:**

```bash
camber job restart qie-trader-bot
```

---

### Step 7: Debugging

If the job fails:

1. **Check logs:**

   ```bash
   camber logs qie-trader-bot --tail 100
   ```

2. **Verify secrets are loaded:**

   ```bash
   camber secret get qie-secrets
   ```

3. **Check job description:**
   ```bash
   camber job describe qie-trader-bot
   ```

---

### Alternative Deployment Methods

#### Option A: If Camber uses Docker

Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY agent.py .

CMD ["python", "agent.py"]
```

Then deploy:

```bash
camber deploy --dockerfile Dockerfile
```

#### Option B: If Camber uses Git deployment

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "QIE-Mind AI Agent"

# Deploy from git
camber deploy --git
```

---

### Expected Output

When successfully running, you should see:

```
🤖 QIE-Mind AI Trading Agent Starting...
✅ Connected to QIE Testnet
🔑 Wallet Loaded
📄 Contract Loaded
🚀 AI Agent is now LIVE and monitoring markets...

⏰ 2025-12-14 10:42:05
🔍 Market Analysis:
   Pair: BTC/USDT
   Signal: BUY
   Amount: 750 tokens
   Confidence: 85.3%
✓ Signal Strong - Executing Trade...
📡 Broadcasting transaction...
✅ Transaction Sent!
   🔗 View: https://testnet.qie.digital/tx/0x...
```

---

### Troubleshooting

**"Cannot connect to QIE Testnet"**

- Check if RPC URL is correct
- Verify QIE testnet is online

**"Insufficient funds for gas"**

- Get testnet QIE from faucet: https://www.qie.digital/faucet

**"Invalid contract address"**

- Ensure CONTRACT_ADDRESS in secrets is correct
- Verify contract is deployed on QIE testnet

---

### Cost & Resources

- This bot runs 24/7
- Check Camber pricing for compute hours
- GitHub Student Pack may include free credits

---

### Next Steps

1. Monitor logs to see transactions
2. Click transaction links to view on QIE Explorer
3. Adjust `LOOP_INTERVAL` in camber.yaml for faster/slower trading
4. Enhance AI logic in `get_market_signal()` for real trading strategies

---

**Your AI Agent is now autonomous and running in the cloud!** 🚀
