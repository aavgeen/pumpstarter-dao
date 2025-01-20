export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  contractAddress: string;
  creator: {
    address: string;
    name: string;
  };
  funding: {
    current: number;
    goal: number;
    contributors: number;
    endDate: string;
  };
  stats: {
    date: string;
    cf: number;
    contribution: number;
    required: number;
  }[];
  transactions: {
    type: string;
    amount: number;
    address: string;
    date: string;
    increase: boolean;
    decrease?: boolean;
    hash: string;
  }[];
  category: string;
  tags: string[];
  imageUrl: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  fundingGoal: number;
  category: string;
  tags: string[];
  creatorName: string;
  endDate: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
} 