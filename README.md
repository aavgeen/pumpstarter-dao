# PumpStarter.dao

PumpStarter.dao is a Web3 crowdfunding platform inspired by Kickstarter, built using modern web technologies and blockchain integration.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
4. [Setup Instructions](#setup-instructions)
5. [Key Features](#key-features)
6. [Folder Structure](#folder-structure)
7. [Component Overview](#component-overview)
8. [Web3 Integration](#web3-integration)
9. [Styling and Theming](#styling-and-theming)
10. [State Management](#state-management)
11. [Testing](#testing)
12. [Deployment](#deployment)
13. [Security Considerations](#security-considerations)
14. [Performance Optimization](#performance-optimization)
15. [Future Enhancements](#future-enhancements)
16. [Troubleshooting](#troubleshooting)
17. [Contributing](#contributing)
18. [License](#license)

## Project Overview

PumpStarter.dao allows users to create, fund, and manage Web3 projects using cryptocurrency. It provides a decentralized approach to crowdfunding, leveraging blockchain technology for transparent and secure transactions.

## Technical Stack

- **Frontend**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Web3 Integration**: wagmi, viem
- **Wallet Connection**: RainbowKit
- **Blockchain**: Ethereum (Mainnet, Polygon, Optimism, Arbitrum)
- **Smart Contracts**: Solidity (not included in this repository)
- **Authentication**: Wallet-based authentication
- **State Management**: React Hooks
- **Data Fetching**: SWR (not implemented yet, but recommended for production)

## Architecture

PumpStarter.dao follows a modern React-based architecture with server-side rendering capabilities:

1. **Next.js App Router**: Utilizing the latest Next.js 13 features for efficient routing and server-side rendering.
2. **Component-Based Structure**: Reusable React components for consistent UI and easier maintenance.
3. **Web3 Integration**: Using wagmi hooks for interacting with Ethereum-based blockchains and smart contracts.
4. **Wallet Connection**: RainbowKit for a seamless and user-friendly wallet connection experience.
5. **Responsive Design**: Tailwind CSS for a mobile-first, responsive layout.
6. **Theme Support**: Light and dark mode support using next-themes.

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pumpstarter-dao.git
cd pumpstarter-dao
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration:
```
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

1. User-friendly landing page with featured projects
2. Wallet connection using RainbowKit (supports multiple popular wallets)
3. Project dashboard with detailed project information
4. Contribution functionality with wallet connection gate
5. Dark/light theme support
6. Responsive design for mobile and desktop
7. Real-time updates of project funding status
8. Creation and management of projects

## Folder Structure

```
pumpstarter-dao/
├── app/                    # Next.js 13 app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── [...routes]/       # Other routes
├── components/            # Reusable React components
│   ├── ui/               # UI components from shadcn
│   └── web3/             # Web3-specific components
├── lib/                   # Utility functions and configurations
├── styles/               # Global styles and Tailwind config
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Component Overview

- `ProjectCard`: Displays project information in a card format
- `ConnectButton`: Wallet connection component using RainbowKit
- `ProjectForm`: Form for creating new projects
- `ContributionModal`: Modal for making contributions
- `ProjectDashboard`: Dashboard showing project metrics
- `Navigation`: Site-wide navigation component
- `ThemeToggle`: Dark/light mode toggle

## Web3 Integration

### Supported Networks
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum

### Smart Contract Interaction
The platform uses wagmi hooks for contract interactions:
- `useContractRead`: For reading project data
- `useContractWrite`: For making contributions
- `useWaitForTransaction`: For transaction status
- `useAccount`: For wallet state management

## Styling and Theming

- Tailwind CSS for utility-first styling
- CSS variables for theme customization
- Dark/light mode support via next-themes
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## State Management

- React Context for global state
- SWR for data fetching (planned)
- Local storage for user preferences
- Wagmi hooks for blockchain state

## Testing

1. Unit Testing:
```bash
npm run test
```

2. E2E Testing (with Cypress):
```bash
npm run cypress
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel deploy
```

## Security Considerations

- Wallet connection security through RainbowKit
- Smart contract interaction validation
- Input sanitization for user-provided data
- Rate limiting on API routes
- Environment variable protection
- Regular dependency updates

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Static page generation where possible
- Caching strategies for blockchain data
- Minimized JavaScript bundles

## Future Enhancements

- Multi-chain support expansion
- DAO governance integration
- Social features and project discovery
- Advanced analytics dashboard
- Mobile app development
- Integration with IPFS for project media

## Troubleshooting

Common issues and solutions:

1. Wallet Connection Issues
   - Ensure proper network selection
   - Clear browser cache
   - Update wallet software

2. Transaction Failures
   - Check gas settings
   - Verify network status
   - Confirm sufficient balance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

Please read CONTRIBUTING.md for detailed guidelines.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

