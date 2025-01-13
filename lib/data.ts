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

export const projects: Project[] = [
  {
    id: "1",
    title: "Decentralized Social Network",
    description: "A revolutionary social network built on blockchain technology, empowering users with complete data ownership and privacy controls. The platform features end-to-end encryption, decentralized storage, and innovative monetization mechanisms for content creators. Our mission is to redefine social networking by putting users first and creating a more equitable digital space.",
    shortDescription: "A revolutionary social network built on blockchain technology, empowering users with complete data ownership...",
    contractAddress: "0x1234...5678",
    creator: {
      address: "0x8765...4321",
      name: "Alex Thompson"
    },
    funding: {
      current: 120184.34,
      goal: 285371.00,
      contributors: 1234,
      endDate: "2024-12-31"
    },
    stats: [
      { date: "30.10.24", cf: 25841.2, contribution: 19473.0, required: 16520.5 },
      { date: "31.10.24", cf: 28500.2, contribution: 22473.0, required: 18520.5 },
      { date: "01.11.24", cf: 24185.5, contribution: 20473.0, required: 17520.5 },
      { date: "02.11.24", cf: 26841.2, contribution: 21473.0, required: 19520.5 }
    ],
    transactions: [
      {
        type: "Required Fund",
        amount: 4420.5,
        address: "0x1234...5678",
        date: "Sep 08 2024",
        increase: true,
        hash: "0xabcd...efgh"
      },
      {
        type: "Contribution",
        amount: 4790.0,
        address: "0x8765...4321",
        date: "Sep 07 2024",
        increase: true,
        hash: "0xijkl...mnop"
      },
      {
        type: "Required Fund",
        amount: 1740.0,
        address: "0x9876...5432",
        date: "Sep 07 2024",
        decrease: true,
        increase: false,
        hash: "0xqrst...uvwx"
      }
    ],
    category: "Social",
    tags: ["Social", "Privacy", "Web3"],
    imageUrl: "/placeholder.jpg"
  },
  // Add more projects as needed
]; 