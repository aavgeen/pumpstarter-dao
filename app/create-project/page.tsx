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
    stakeAmount: "0.1", // Default stake amount in ETH
  });

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

  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulateData?.request) return;
    writeContract(simulateData.request);
  };

  if (isSuccess) {
    router.push("/projects"); // Redirect to projects page after successful creation
  }

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
                  <Label htmlFor="fundingGoal">Funding Goal (ETH)</Label>
                  <Input
                    id="fundingGoal"
                    name="fundingGoal"
                    type="number"
                    step="0.01"
                    value={projectDetails.fundingGoal}
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
                    step="0.01"
                    value={projectDetails.stakeAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </form>
            </CardContent>
          </ScaleIn>

          <CardFooter className="flex justify-between">
            {isConnected ? (
              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Creating Project..." : "Create Project"}
              </Button>
            ) : (
              <ConnectButton />
            )}
          </CardFooter>
        </Card>
      </FadeIn>

      {isError && (
        <FadeIn>
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an error creating your project. Please try again.
            </AlertDescription>
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
