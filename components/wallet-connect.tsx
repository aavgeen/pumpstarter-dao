"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet } from 'lucide-react'

const wallets = [
  { name: 'MetaMask', icon: '🦊' },
  { name: 'WalletConnect', icon: '🔗' },
  { name: 'Coinbase Wallet', icon: '🏦' },
]

export default function WalletConnect() {
  const [connected, setConnected] = useState(false)

  const connectWallet = (walletName: string) => {
    // Implement actual wallet connection logic here
    console.log(`Connecting to ${walletName}...`)
    setConnected(true)
  }

  const disconnectWallet = () => {
    // Implement actual wallet disconnection logic here
    console.log('Disconnecting wallet...')
    setConnected(false)
  }

  if (connected) {
    return (
      <Button variant="outline" onClick={disconnectWallet}>
        Disconnect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {wallets.map((wallet) => (
          <DropdownMenuItem key={wallet.name} onClick={() => connectWallet(wallet.name)}>
            <span className="mr-2">{wallet.icon}</span>
            {wallet.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

