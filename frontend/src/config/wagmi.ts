import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';

// Define QIE Testnet chain
export const qieTestnet = defineChain({
  id: 1983,
  name: 'QIE Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'QIE',
    symbol: 'QIE',
  },
  rpcUrls: {
    default: {
      http: ['https://testnetqierpc1.digital/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'QIE Explorer',
      url: 'https://testnet.qie.digital/',
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: 'QIE-Mind',
  projectId: 'qie-mind-demo', // WalletConnect project ID (demo)
  chains: [qieTestnet],
  ssr: false,
});
