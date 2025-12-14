# QIE-Mind Smart Contract

## 🎯 Project Overview

This is the Hardhat backend for **QIE-Mind**, a Decentralized AI Hedge Fund Dashboard. The smart contract (`QIEVault.sol`) manages user deposits, AI trading execution, and emergency withdrawals on the QIE Blockchain.

## 📋 Setup Complete ✅

All files have been created and configured:

- ✅ `contracts/QIEVault.sol` - Main vault contract
- ✅ `scripts/deploy.js` - Deployment script
- ✅ `hardhat.config.js` - Network configuration
- ✅ `.env` - Environment variables with your private key
- ✅ Dependencies installed

## 🚀 Next Steps

### 1. **Verify QIE Testnet RPC Connection**

The deployment is currently timing out. Please verify:

- QIE Testnet RPC is online: `https://testnetqierpc1.digital/`
- Your wallet has QIE testnet tokens for gas fees
- Network connectivity is stable

### 2. **Deploy the Contract**

Once the RPC is accessible, run:

```bash
npx hardhat run scripts/deploy.js --network qie_testnet
```

### 3. **Save the Contract Address**

After successful deployment, you'll see:

```
✅ DEPLOYMENT SUCCESSFUL!
📄 Contract Address: 0x123456789abcdef...
```

**COPY THIS ADDRESS!** You'll need it for the frontend.

### 4. **Update Frontend**

Go to your `qie-mind-guide` frontend project and update the contract address in your Web3 integration files.

## 📁 Project Structure

```
qie-smart-contract/
├── contracts/
│   └── QIEVault.sol          # Main smart contract
├── scripts/
│   └── deploy.js             # Deployment script
├── hardhat.config.js         # Hardhat configuration
├── .env                      # Environment variables (NEVER commit!)
├── .gitignore               # Git ignore rules
└── package.json             # Dependencies
```

## 🔐 Security Notes

- ⚠️ Your private key is stored in `.env` - **NEVER commit this file to Git**
- ⚠️ `.gitignore` is configured to exclude `.env`
- ⚠️ This is for TESTNET ONLY - never use testnet keys on mainnet

## 🛠️ Smart Contract Features

### `QIEVault.sol` Functions:

1. **`receive()`** - Accept QIE deposits
2. **`executeTrade()`** - AI agent executes simulated trades
3. **`emergencyWithdraw()`** - Owner can withdraw all funds
4. **`getBalance()`** - Check vault balance

## 🔧 Troubleshooting

### If deployment fails:

1. **Check RPC connection:**

   ```bash
   # Test if the RPC is responding
   curl -X POST https://testnetqierpc1.digital/ \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
   ```

2. **Verify your private key:**

   - Make sure it's in `.env` without `0x` prefix
   - Confirm the wallet has QIE testnet tokens

3. **Try alternative RPC (if available):**

   - Update `QIE_TESTNET_RPC` in `.env`

4. **Compile before deploying:**
   ```bash
   npx hardhat compile
   ```

## 📞 Support

If you encounter issues:

- Check Hardhat documentation: https://hardhat.org/docs
- Verify QIE network status
- Ensure you have testnet QIE tokens for gas

## 🎓 What You've Learned

- ✅ Set up a professional Hardhat development environment
- ✅ Created a production-ready smart contract
- ✅ Configured custom blockchain networks
- ✅ Managed environment variables securely
- ✅ Used ES modules with Hardhat

---

**Your contract is ready to deploy once the QIE Testnet RPC is accessible!**
