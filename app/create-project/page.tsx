"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  FadeIn,
  ScaleIn,
  SlideInFromLeft,
} from "@/components/motion/primitives";
import { createProject } from "@/lib/api/projects";

// Mock contract ABI (replace with your actual contract ABI)
const contractABI = [
  {
    name: "createProject",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "fundingGoal", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

export default function CreateProject() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    fundingGoal: "",
    category: "",
    tags: "",
    endDate: "",
    stakeAmount: "0.1", // Default stake amount in ETH
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: simulateData } = useSimulateContract({
    address: "0x1234...5678" as `0x${string}`, // Replace with your actual contract address
    abi: contractABI,
    functionName: "createProject",
    args: [
      projectDetails.title,
      projectDetails.description,
      parseEther(projectDetails.fundingGoal || "0"),
    ],
    value: parseEther(projectDetails.stakeAmount),
  });

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // First, create the project in the API
      const response = await createProject({
        title: projectDetails.title,
        description: projectDetails.description,
        fundingGoal: parseFloat(projectDetails.fundingGoal),
        category: projectDetails.category,
        tags: projectDetails.tags.split(',').map(tag => tag.trim()),
        endDate: projectDetails.endDate,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      // Then, create the project on-chain
      if (simulateData?.request) {
        writeContract(simulateData.request);
      }

      router.push("/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <Card className="max-w-2xl mx-auto">
          <SlideInFromLeft>
            <CardHeader>
              <CardTitle>Create a New Project</CardTitle>
              <CardDescription>
                Fill in the details for your new crowdfunding project
              </CardDescription>
            </CardHeader>
          </SlideInFromLeft>

          <ScaleIn>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={projectDetails.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={projectDetails.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundingGoal">Funding Goal (USD)</Label>
                  <Input
                    id="fundingGoal"
                    name="fundingGoal"
                    type="number"
                    value={projectDetails.fundingGoal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={projectDetails.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={projectDetails.tags}
                    onChange={handleInputChange}
                    placeholder="e.g. DeFi, NFT, Gaming"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={projectDetails.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakeAmount">Stake Amount (ETH)</Label>
                  <Input
                    id="stakeAmount"
                    name="stakeAmount"
                    type="number"
                    value={projectDetails.stakeAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isConnected || isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? "Creating Project..." : "Create Project"}
                </Button>
              </form>
            </CardContent>
          </ScaleIn>
        </Card>
      </FadeIn>

      {error && (
        <FadeIn>
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </FadeIn>
      )}

      {isSuccess && (
        <FadeIn>
          <Alert className="mt-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your project has been created successfully! Redirecting to
              projects page...
            </AlertDescription>
          </Alert>
        </FadeIn>
      )}
    </div>
  );
}
