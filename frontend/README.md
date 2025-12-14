# QIE-Mind | Decentralized AI Hedge Fund Dashboard

## Project Overview

QIE-Mind is an autonomous AI-powered hedge fund dashboard built for QIE Blockchain. This frontend provides real-time monitoring, strategy configuration, and portfolio management capabilities.

## Development Setup

To run this project locally:

Prerequisites: Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the frontend directory
cd qie-mind-guide/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## What technologies are used for this project?

This project is built with:

- **Vite** - Build tool
- **TypeScript** - Type safety
- **React** - UI framework
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **RainbowKit** - Web3 wallet connection
- **Wagmi** - Ethereum interactions
- **Recharts** - Data visualization

## Deployment

Build the production bundle:

```sh
npm run build
```

The `dist/` folder contains the production-ready static files that can be deployed to any static hosting service.
