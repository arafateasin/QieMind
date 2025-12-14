"""
QIE-Mind AI Trading Agent
A 24/7 autonomous trading bot for the QIE Blockchain
"""

import os
import time
import random
from datetime import datetime
from web3 import Web3
from dotenv import load_dotenv
from colorama import init, Fore, Style

# Initialize colorama for colored terminal output
init(autoreset=True)

# Load environment variables
load_dotenv()

# Configuration
RPC_URL = os.getenv("RPC_URL", "https://testnetqierpc1.digital/")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
LOOP_INTERVAL = int(os.getenv("LOOP_INTERVAL", "15"))  # seconds

# Validate environment variables
if not PRIVATE_KEY:
    print(f"{Fore.RED}❌ ERROR: PRIVATE_KEY not found in .env file")
    exit(1)

if not CONTRACT_ADDRESS:
    print(f"{Fore.RED}❌ ERROR: CONTRACT_ADDRESS not found in .env file")
    exit(1)

# Connect to QIE Testnet
print(f"{Fore.CYAN}{'='*60}")
print(f"{Fore.CYAN}🤖 QIE-Mind AI Trading Agent Starting...")
print(f"{Fore.CYAN}{'='*60}\n")

try:
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    if w3.is_connected():
        print(f"{Fore.GREEN}✅ Connected to QIE Testnet")
        print(f"{Fore.WHITE}   RPC: {RPC_URL}")
        print(f"{Fore.WHITE}   Chain ID: {w3.eth.chain_id}\n")
    else:
        print(f"{Fore.RED}❌ Failed to connect to QIE Testnet")
        exit(1)
except Exception as e:
    print(f"{Fore.RED}❌ Connection Error: {e}")
    exit(1)

# Load wallet
try:
    account = w3.eth.account.from_key(PRIVATE_KEY)
    wallet_address = account.address
    print(f"{Fore.GREEN}🔑 Wallet Loaded")
    print(f"{Fore.WHITE}   Address: {wallet_address}")
    
    # Check balance
    balance = w3.eth.get_balance(wallet_address)
    balance_qie = w3.from_wei(balance, 'ether')
    print(f"{Fore.WHITE}   Balance: {balance_qie} QIE\n")
    
    if balance == 0:
        print(f"{Fore.YELLOW}⚠️  WARNING: Wallet has 0 QIE. Get testnet tokens from faucet.")
        print(f"{Fore.YELLOW}   Faucet: https://www.qie.digital/faucet\n")
except Exception as e:
    print(f"{Fore.RED}❌ Wallet Error: {e}")
    exit(1)

# Smart Contract ABI (minimal - just the executeTrade function)
CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "token", "type": "string"},
            {"internalType": "string", "name": "action", "type": "string"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "executeTrade",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

# Initialize contract
try:
    contract = w3.eth.contract(
        address=Web3.to_checksum_address(CONTRACT_ADDRESS),
        abi=CONTRACT_ABI
    )
    print(f"{Fore.GREEN}📄 Contract Loaded")
    print(f"{Fore.WHITE}   Address: {CONTRACT_ADDRESS}\n")
except Exception as e:
    print(f"{Fore.RED}❌ Contract Error: {e}")
    exit(1)

# Trading pairs and market simulation
TRADING_PAIRS = ["QIE/USDT", "BTC/USDT", "ETH/USDT", "GOLD/USDT"]
ACTIONS = ["BUY", "SELL"]

def get_market_signal():
    """
    Simulate AI market analysis
    Returns: (token, action, amount, confidence)
    """
    token = random.choice(TRADING_PAIRS)
    action = random.choice(ACTIONS)
    amount = random.randint(100, 1000)  # Amount in tokens
    confidence = random.uniform(0.6, 0.95)
    
    return token, action, amount, confidence

def log_trade_analysis(token, action, amount, confidence):
    """Pretty print trade analysis"""
    print(f"{Fore.CYAN}{'─'*60}")
    print(f"{Fore.WHITE}⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{Fore.YELLOW}🔍 Market Analysis:")
    print(f"{Fore.WHITE}   Pair: {token}")
    print(f"{Fore.WHITE}   Signal: {action}")
    print(f"{Fore.WHITE}   Amount: {amount} tokens")
    print(f"{Fore.WHITE}   Confidence: {confidence*100:.1f}%")

def execute_on_chain(token, action, amount):
    """
    Execute trade on QIE blockchain
    Returns: transaction hash or None
    """
    try:
        # Get nonce
        nonce = w3.eth.get_transaction_count(wallet_address)
        
        # Build transaction
        txn = contract.functions.executeTrade(
            token,
            action,
            amount
        ).build_transaction({
            'from': wallet_address,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.eth.gas_price,
            'chainId': w3.eth.chain_id
        })
        
        # Sign transaction
        signed_txn = w3.eth.account.sign_transaction(txn, PRIVATE_KEY)
        
        # Send transaction (fixed for web3.py 6.x)
        print(f"{Fore.YELLOW}📡 Broadcasting transaction...")
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        tx_hash_hex = tx_hash.hex()
        
        print(f"{Fore.GREEN}✅ Transaction Sent!")
        print(f"{Fore.WHITE}   TX Hash: {tx_hash_hex}")
        print(f"{Fore.CYAN}   🔗 View: https://testnet.qie.digital/tx/{tx_hash_hex}")
        
        # Wait for confirmation (optional - can be disabled for faster loop)
        print(f"{Fore.YELLOW}⏳ Waiting for confirmation...")
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=60)
        
        if receipt['status'] == 1:
            print(f"{Fore.GREEN}✅ Transaction Confirmed!")
            print(f"{Fore.WHITE}   Block: {receipt['blockNumber']}")
            print(f"{Fore.WHITE}   Gas Used: {receipt['gasUsed']}")
        else:
            print(f"{Fore.RED}❌ Transaction Failed!")
        
        return tx_hash_hex
        
    except Exception as e:
        print(f"{Fore.RED}❌ Execution Error: {str(e)}")
        return None

def main_loop():
    """
    Main trading loop - runs 24/7
    """
    print(f"{Fore.GREEN}{'='*60}")
    print(f"{Fore.GREEN}🚀 AI Agent is now LIVE and monitoring markets...")
    print(f"{Fore.GREEN}{'='*60}\n")
    
    trade_count = 0
    
    while True:
        try:
            # Get market signal
            token, action, amount, confidence = get_market_signal()
            
            # Log analysis
            log_trade_analysis(token, action, amount, confidence)
            
            # Decision logic: only trade if confidence > 70%
            if confidence > 0.70:
                print(f"{Fore.GREEN}✓ Signal Strong - Executing Trade...")
                tx_hash = execute_on_chain(token, action, amount)
                
                if tx_hash:
                    trade_count += 1
                    print(f"{Fore.MAGENTA}📊 Total Trades Executed: {trade_count}\n")
            else:
                print(f"{Fore.YELLOW}⊘ Signal Weak - Skipping Trade\n")
            
            # Sleep before next iteration
            print(f"{Fore.WHITE}💤 Sleeping for {LOOP_INTERVAL} seconds...\n")
            time.sleep(LOOP_INTERVAL)
            
        except KeyboardInterrupt:
            print(f"\n{Fore.YELLOW}⚠️  Agent stopped by user")
            print(f"{Fore.WHITE}Total trades executed: {trade_count}")
            break
        except Exception as e:
            print(f"{Fore.RED}❌ Error in main loop: {e}")
            print(f"{Fore.YELLOW}⏳ Retrying in 30 seconds...")
            time.sleep(30)

if __name__ == "__main__":
    main_loop()
