'use client'

import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zksync,
} from 'viem/chains'
import { http } from 'viem'
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query"

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ''
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID || ''

const chains = [mainnet, polygon, optimism, arbitrum, base, zksync] as const

const config = getDefaultConfig({
  appName: 'PumpStarter.dao',
  projectId,
  chains,
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`),
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${alchemyId}`),
    [optimism.id]: http(`https://opt-mainnet.g.alchemy.com/v2/${alchemyId}`),
    [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${alchemyId}`),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

