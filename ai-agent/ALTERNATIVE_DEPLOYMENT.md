# Alternative Deployment Options for QIE-Mind AI Agent

Since Camber CLI isn't available, here are other ways to deploy your 24/7 trading bot:

---

## ✅ **Option 1: Railway.app (Recommended - Free Tier)**

Railway is perfect for Python bots and has a generous free tier.

### Setup:

1. **Install Railway CLI:**

   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**

   ```bash
   railway login
   ```

3. **Create Project:**

   ```bash
   cd c:\Users\user\Documents\BlockChain\ai-agent
   railway init
   ```

4. **Add Environment Variables:**

   ```bash
   railway variables set RPC_URL=https://testnetqierpc1.digital/
   railway variables set PRIVATE_KEY=062d35f536f2204a0fb67ef30c1623882b67771a3b65b0057ba2735c16df210b
   railway variables set CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
   railway variables set LOOP_INTERVAL=15
   ```

5. **Deploy:**

   ```bash
   railway up
   ```

6. **View Logs:**
   ```bash
   railway logs
   ```

---

## ✅ **Option 2: Render.com (Free Tier)**

### Setup:

1. **Push to GitHub:**

   ```bash
   cd c:\Users\user\Documents\BlockChain\ai-agent
   git init
   git add .
   git commit -m "QIE-Mind AI Agent"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to render.com:**

   - Sign up with GitHub
   - Click "New +" → "Background Worker"
   - Connect your repo
   - Set Build Command: `pip install -r requirements.txt`
   - Set Start Command: `python agent.py`

3. **Add Environment Variables** (in Render dashboard):

   - `RPC_URL` = `https://testnetqierpc1.digital/`
   - `PRIVATE_KEY` = `062d35f536f2204a0fb67ef30c1623882b67771a3b65b0057ba2735c16df210b`
   - `CONTRACT_ADDRESS` = `YOUR_CONTRACT_ADDRESS`
   - `LOOP_INTERVAL` = `15`

4. **Deploy** and view logs in dashboard

---

## ✅ **Option 3: Heroku (Free Dyno)**

### Setup:

1. **Install Heroku CLI:**

   ```bash
   npm install -g heroku
   ```

2. **Login:**

   ```bash
   heroku login
   ```

3. **Create App:**

   ```bash
   cd c:\Users\user\Documents\BlockChain\ai-agent
   heroku create qie-trader-bot
   ```

4. **Add Procfile:**
   Create a file named `Procfile` (no extension):

   ```
   worker: python agent.py
   ```

5. **Set Environment Variables:**

   ```bash
   heroku config:set RPC_URL=https://testnetqierpc1.digital/
   heroku config:set PRIVATE_KEY=062d35f536f2204a0fb67ef30c1623882b67771a3b65b0057ba2735c16df210b
   heroku config:set CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
   heroku config:set LOOP_INTERVAL=15
   ```

6. **Deploy:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a qie-trader-bot
   git push heroku main
   ```

7. **Scale Worker:**

   ```bash
   heroku ps:scale worker=1
   ```

8. **View Logs:**
   ```bash
   heroku logs --tail
   ```

---

## ✅ **Option 4: Run on Your Own VPS (Digital Ocean, AWS, etc.)**

### Using `screen` to keep it running:

```bash
# SSH into your server
ssh user@your-server

# Install Python and dependencies
sudo apt update
sudo apt install python3 python3-pip screen

# Upload your code
scp -r ai-agent user@your-server:/home/user/

# Run in background with screen
cd /home/user/ai-agent
pip3 install -r requirements.txt
screen -S qie-bot
python3 agent.py

# Detach: Press Ctrl+A, then D
# Reattach: screen -r qie-bot
```

---

## ✅ **Option 5: Windows Task Scheduler (Local Machine - Restart on Crash)**

If you want to run it on your local machine 24/7:

1. **Create a batch file** `run_agent.bat`:

   ```batch
   @echo off
   cd c:\Users\user\Documents\BlockChain\ai-agent
   python agent.py
   ```

2. **Open Task Scheduler:**
   - Press Win+R → `taskschd.msc`
   - Create Basic Task
   - Name: "QIE Trading Bot"
   - Trigger: "When I log on"
   - Action: "Start a program"
   - Program: `c:\Users\user\Documents\BlockChain\ai-agent\run_agent.bat`
   - Check: "Run whether user is logged on or not"

---

## ✅ **Option 6: Docker + Any Cloud Provider**

Create `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY agent.py .

CMD ["python", "agent.py"]
```

Build and run:

```bash
docker build -t qie-agent .
docker run -d \
  -e RPC_URL=https://testnetqierpc1.digital/ \
  -e PRIVATE_KEY=YOUR_KEY \
  -e CONTRACT_ADDRESS=YOUR_CONTRACT \
  -e LOOP_INTERVAL=15 \
  --name qie-bot \
  qie-agent

# View logs
docker logs -f qie-bot
```

---

## 🎯 **Recommended Path:**

1. **For Hackathon Demo:** Use **Railway** (easiest, free, fast)
2. **For Production:** Use **Render.com** or **Railway**
3. **For Quick Testing:** Run locally with Task Scheduler

---

## 📝 **Quick Railway Deployment (5 minutes):**

```bash
# 1. Install
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy
cd c:\Users\user\Documents\BlockChain\ai-agent
railway init
railway up

# 4. Add secrets in Railway dashboard:
# Visit: https://railway.app/dashboard
# Add environment variables there

# 5. View logs
railway logs
```

---

**Choose your platform and I'll help you deploy!** 🚀
