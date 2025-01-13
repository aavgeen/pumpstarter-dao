"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { parseEther } from "viem";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ChevronDown,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  FadeIn,
  FadeInStagger,
  SlideInFromLeft,
  SlideInFromRight,
  ScaleIn,
} from "@/components/motion/primitives";
import { useProject } from "@/hooks/use-projects";

// Navigation items
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Contributions", icon: PiggyBank },
  { label: "Staking", icon: CreditCard },
  { label: "My Wallet", icon: Wallet },
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
  const params = useParams();
  const projectId = typeof params.id === 'string' ? params.id : '1';
  const { project, loading, error } = useProject(projectId);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");
  const { address, isConnected } = useAccount();
  
  // Move these hooks before any conditional returns
  const { data: simulateData } = useSimulateContract({
    address: project?.contractAddress as `0x${string}` ?? '0x0',
    abi: contractABI,
    functionName: "contribute",
    value: contributionAmount ? parseEther(contributionAmount) : undefined,
    // enabled: !!project?.contractAddress && !!contributionAmount,
  });

  const { writeContract, isPending, isSuccess } = useWriteContract();

  useEffect(() => {
    if (contributionAmount) {
      // Trigger any side effects or validations here if needed
    }
  }, [contributionAmount]);

  const handleContribute = async () => {
    if (!simulateData?.request) return;
    writeContract(simulateData.request);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4">
        <div className="animate-pulse">
          <Card className="p-4 mb-6">
            <div className="h-8 bg-muted rounded mb-4" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="p-6 mb-6">
                <div className="h-32 bg-muted rounded" />
              </Card>
              <Card className="p-6 mb-6">
                <div className="h-64 bg-muted rounded" />
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded" />
                  <div className="h-8 bg-muted rounded" />
                  <div className="h-8 bg-muted rounded" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Error</h1>
          <p className="text-muted-foreground">Failed to load project details</p>
        </div>
      </div>
    );
  }

  const fundingProgress = (project.funding.current / project.funding.goal) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground px-4">
      <header className="flex justify-between items-center p-4 bg-card rounded-lg mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <div className="flex gap-2 mt-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Created by</div>
            <div className="font-medium">{project.creator.name || 'Anonymous'}</div>
          </div>
          <ConnectButton />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3">
          {isConnected && (
            <nav className="flex space-x-4 mb-6">
              {navItems.map((item) => (
                <Button key={item.label} variant="outline" className="flex-1">
                  <item.icon size={20} className="mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          )}

          {/* Project Description */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">About the Project</h2>
            <p className="text-muted-foreground">
              {showFullDescription ? project.description : project.shortDescription}
              <Button
                variant="link"
                className="px-2 h-auto"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show less" : "Read more"}
              </Button>
            </p>
          </Card>

          {/* Chart Section */}
          <FadeIn>
            <Card className="p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Funding Progress</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold">${project.funding.current.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">of ${project.funding.goal.toLocaleString()} goal</div>
                </div>
              </div>
              <div className="relative h-2 bg-muted rounded-full mb-4">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{ width: `${fundingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>{project.funding.contributors.toLocaleString()} backers</div>
                <div>{Math.round(fundingProgress)}% funded</div>
              </div>
              <div className="h-[300px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={project.stats}>
                    <defs>
                      <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient
                        id="colorContribution"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient
                        id="colorRequired"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
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
          </FadeIn>

          {/* Transactions Section */}
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
              {project.transactions.map((transaction, index) => (
                <ScaleIn key={index}>
                  <Card className="p-4 flex items-center justify-between bg-card">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.type}</div>
                        <div className="text-sm text-muted-foreground">
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
                        <div className="text-sm text-muted-foreground">
                          {transaction.date}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
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

        {/* Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Wallet className="h-4 w-4" />
                <div className="font-medium">{project.contractAddress}</div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Current Funding</div>
                  <div className="text-2xl font-bold">${project.funding.current.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Goal</div>
                  <div className="text-2xl font-bold">${project.funding.goal.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">End Date</div>
                  <div className="font-medium">{new Date(project.funding.endDate).toLocaleDateString()}</div>
                </div>
                {!isConnected ? (
                  <ConnectButton />
                ) : (
                  <div>
                    <input
                      type="number"
                      placeholder="Amount in ETH"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      className="w-full p-2 mb-2 bg-muted rounded"
                    />
                    <Button
                      className="w-full"
                      onClick={handleContribute}
                      disabled={!contributionAmount || isPending}
                    >
                      {isPending ? "Contributing..." : "Contribute"}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
