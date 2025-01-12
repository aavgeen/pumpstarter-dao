"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { parseEther } from "viem";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  ArrowDownToLine,
  PiggyBank,
  CreditCard,
  Settings,
  Wallet,
  Plus,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  FadeIn,
  FadeInStagger,
  SlideInFromLeft,
  SlideInFromRight,
  ScaleIn,
} from "@/components/motion/primitives";

// Sample data for the chart
const chartData = [
  { date: "30.10.24", cf: 25841.2, contribution: 19473.0, required: 16520.5 },
  { date: "31.10.24", cf: 28500.2, contribution: 22473.0, required: 18520.5 },
  { date: "01.11.24", cf: 24185.5, contribution: 20473.0, required: 17520.5 },
  { date: "02.11.24", cf: 26841.2, contribution: 21473.0, required: 19520.5 },
];

const transactions = [
  {
    type: "Required Fund",
    amount: 4420.5,
    address: "0x1234...5678",
    date: "Sep 08 2024",
    increase: true,
    hash: "0xabcd...efgh",
  },
  {
    type: "Contribution",
    amount: 4790.0,
    address: "0x8765...4321",
    date: "Sep 07 2024",
    increase: true,
    hash: "0xijkl...mnop",
  },
  {
    type: "Required Fund",
    amount: 1740.0,
    address: "0x9876...5432",
    date: "Sep 07 2024",
    decrease: true,
    hash: "0xqrst...uvwx",
  },
];

// Navigation items with owner-only flags
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true, ownerOnly: false },
  { icon: ArrowDownToLine, label: "Withdraw", ownerOnly: true },
  { icon: PiggyBank, label: "Contributions", ownerOnly: false },
  { icon: CreditCard, label: "Staking", ownerOnly: false },
  { icon: Settings, label: "Settings", ownerOnly: true },
  { icon: Wallet, label: "My Wallet", ownerOnly: false },
];

// Mock contract ABI (replace with your actual contract ABI)
const contractABI = [
  {
    name: "contribute",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: [],
  },
] as const;

export default function ProjectDashboard() {
  const searchParams = useSearchParams();
  const isOwner = searchParams.get("owner") === "true";
  const projectAddress = "0x1234...5678"; // This would come from your contract
  const [contributionAmount, setContributionAmount] = useState("");

  const { address, isConnected } = useAccount();

  const { data: simulateData } = useSimulateContract({
    address: projectAddress as `0x${string}`,
    abi: contractABI,
    functionName: "contribute",
    value: contributionAmount ? parseEther(contributionAmount) : undefined,
  });

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleContribute = async () => {
    if (!simulateData?.request) return;
    writeContract(simulateData.request);
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      {/* Left Sidebar */}
      <SlideInFromLeft>
        <aside className="fixed left-0 top-0 h-full w-64 bg-[#161923] p-6">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-white rounded-full" />
            <span className="font-semibold">PumpStarter.dao</span>
          </div>

          <nav className="space-y-2">
            {navItems
              .filter((item) => !item.ownerOnly || isOwner)
              .map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors
                    ${
                      item.active
                        ? "bg-[#2D31A6] text-white"
                        : "text-gray-400 hover:bg-gray-800"
                    }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
          </nav>

          <div className="absolute bottom-8 left-6 right-6">
            <div className="flex items-center gap-3 bg-[#1D2029] p-3 rounded-lg">
              <Wallet className="h-5 w-5" />
              <div className="flex-1">
                <div className="font-medium text-sm">{projectAddress}</div>
                <div className="text-xs text-gray-400">Project Contract</div>
              </div>
            </div>
          </div>
        </aside>
      </SlideInFromLeft>

      {/* Main Content */}
      <main className="pl-64">
        <div className="p-8">
          {/* Header */}
          <FadeIn>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold mb-1">
                  Project Dashboard
                </h1>
                <div className="flex gap-6 text-sm text-gray-400">
                  <span>CF: $20,184.34</span>
                  <span>Contribution: $541,840.00</span>
                  <span>Required Fund: $285,371.00</span>
                </div>
              </div>
              <div className="flex gap-3">
                {isOwner && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                  >
                    <Plus />
                  </Button>
                )}
                <ConnectButton />
              </div>
            </div>
          </FadeIn>

          {/* Cards Grid */}
          <FadeInStagger faster>
            <div className="grid grid-cols-12 gap-6 mb-6">
              {/* Contribution Card */}
              <ScaleIn>
                <Card className="col-span-4 bg-[#161923] border-0 p-6">
                  <div className="text-sm text-gray-400 mb-2">
                    Total Contributions
                  </div>
                  <div className="text-3xl font-semibold mb-4">$541,840.00</div>
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-800">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: "75%" }}
                    />
                  </div>
                </Card>
              </ScaleIn>

              {/* Required Fund Card */}
              <ScaleIn>
                <Card className="col-span-4 bg-[#161923] border-0 p-6">
                  <div className="text-sm text-gray-400 mb-2">
                    Required Fund
                  </div>
                  <div className="text-3xl font-semibold mb-4">$285,371.00</div>
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-800">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-yellow-500"
                      style={{ width: "35%" }}
                    />
                  </div>
                </Card>
              </ScaleIn>

              {/* Balance Card */}
              <ScaleIn>
                <Card className="col-span-4 bg-[#161923] border-0 p-6">
                  <div className="text-sm text-gray-400 mb-2">Project Fund</div>
                  <div className="text-3xl font-semibold mb-4">$120,184.34</div>
                  {isOwner ? (
                    <Button className="w-full">Withdraw Funds</Button>
                  ) : (
                    <div>
                      <input
                        type="number"
                        placeholder="Amount in ETH"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="w-full p-2 mb-2 bg-gray-800 rounded"
                      />
                      <Button
                        className="w-full"
                        onClick={handleContribute}
                        disabled={
                          !isConnected || !contributionAmount || isPending
                        }
                      >
                        {isPending ? "Contributing..." : "Contribute"}
                      </Button>
                      {isSuccess && (
                        <div className="mt-2 text-green-500">
                          Contribution successful!
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </ScaleIn>
            </div>
          </FadeInStagger>

          {/* Statistics Section */}
          <SlideInFromRight>
            <Card className="bg-[#161923] border-0 p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Statistics</h2>
                <h3 className="text-lg">Contributions</h3>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#6366F1"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6366F1"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorContribution"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#22C55E"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#22C55E"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorRequired"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#A855F7"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#A855F7"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="cf"
                      stroke="#6366F1"
                      fillOpacity={1}
                      fill="url(#colorCf)"
                    />
                    <Area
                      type="monotone"
                      dataKey="contribution"
                      stroke="#22C55E"
                      fillOpacity={1}
                      fill="url(#colorContribution)"
                    />
                    <Area
                      type="monotone"
                      dataKey="required"
                      stroke="#A855F7"
                      fillOpacity={1}
                      fill="url(#colorRequired)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </SlideInFromRight>

          {/* Transactions */}
          <FadeIn>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Transactions</h2>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </div>
          </FadeIn>

          <FadeInStagger>
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <ScaleIn key={index}>
                  <Card className="bg-[#161923] border-0 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.type}</div>
                        <div className="text-sm text-gray-400">
                          {transaction.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div
                          className={
                            transaction.increase
                              ? "text-green-500"
                              : "text-purple-500"
                          }
                        >
                          {transaction.increase ? "+" : "-"}$
                          {transaction.amount}
                        </div>
                        <div className="text-sm text-gray-400">
                          {transaction.date}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400"
                        asChild
                      >
                        <a
                          href={`https://etherscan.io/tx/${transaction.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                </ScaleIn>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </main>
    </div>
  );
}
