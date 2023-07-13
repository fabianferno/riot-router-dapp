import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import customTheme from '../styles/theme';

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai, arbitrumGoerli, goerli, avalancheFuji, baseGoerli, scrollTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
const mantleTestnet = {
  id: 43_114,
  name: 'Mantle Testnet',
  network: 'mantle-testnet',
  iconUrl: 'https://cryptototem.com/wp-content/uploads/2023/01/Mantle-logo.jpg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle Testnet',
    symbol: 'BIT',
  },
  rpcUrls: {
    public: {
      http: ['https://rpc.testnet.mantle.xyz'],
    },
    default: {
      http: ['https://rpc.testnet.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Explorer',
      url: 'https://explorer.testnet.mantle.xyz/',
    },
    etherscan: {
      name: 'Mantle Explorer',
      url: 'https://explorer.testnet.mantle.xyz/',
    },
  },
  testnet: false,
};
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, arbitrumGoerli, goerli, avalancheFuji, baseGoerli, scrollTestnet, mantleTestnet],
  [publicProvider()],
);
console.log(process.env.NEXT_PUBLIC_PROJECT_ID);
const { connectors } = getDefaultWallets({
  appName: 'Zixins Router',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
