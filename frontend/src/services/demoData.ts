// Demo data service for FlowGenie application
// Provides realistic mock data when backend is not available

export interface DemoAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'stopped';
  profitLoss: number;
  totalTrades: number;
  winRate: number;
  lastActivity: string;
  strategy: string;
  category: string;
  tags: string[];
  creator: string;
  performance: {
    dailyPnL: number;
    weeklyPnL: number;
    monthlyPnL: number;
    bestTrade: number;
    worstTrade: number;
  };
}

export interface DemoMarketplaceAgent {
  id: string;
  name: string;
  description: string;
  creator: string;
  price: number;
  rating: number;
  downloads: number;
  category: string;
  tags: string[];
  performance: {
    winRate: number;
    totalTrades: number;
    avgProfit: number;
  };
  image: string;
  featured: boolean;
}

export interface DemoTransaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  nftName: string;
  nftId: string;
  price: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  gasUsed: number;
  blockHeight: number;
}

export interface DemoNFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  price: number;
  rarity: string;
  owner: string;
  lastSale: number;
  marketCap: number;
}

// Demo agents data
export const demoAgents: DemoAgent[] = [
  {
    id: 'demo_1',
    name: 'NBA Top Shot Value Hunter',
    description: 'Automatically identifies and purchases undervalued NBA Top Shot moments based on player performance and market trends.',
    status: 'active',
    profitLoss: 234.50,
    totalTrades: 47,
    winRate: 78.7,
    lastActivity: '2 minutes ago',
    strategy: 'Value investing with momentum signals',
    category: 'NBA Top Shot',
    tags: ['NBA', 'Value Investing', 'Automated'],
    creator: 'FlowTrader',
    performance: {
      dailyPnL: 12.30,
      weeklyPnL: 89.40,
      monthlyPnL: 234.50,
      bestTrade: 45.20,
      worstTrade: -8.10
    }
  },
  {
    id: 'demo_2',
    name: 'Portfolio Optimizer Pro',
    description: 'Advanced portfolio management agent that rebalances your NFT collection for optimal risk-adjusted returns.',
    status: 'active',
    profitLoss: 156.20,
    totalTrades: 23,
    winRate: 82.6,
    lastActivity: '5 minutes ago',
    strategy: 'Risk-adjusted portfolio rebalancing',
    category: 'Portfolio Management',
    tags: ['Portfolio', 'Risk Management', 'DeFi'],
    creator: 'DeFiMaster',
    performance: {
      dailyPnL: 8.90,
      weeklyPnL: 67.30,
      monthlyPnL: 156.20,
      bestTrade: 31.50,
      worstTrade: -5.20
    }
  },
  {
    id: 'demo_3',
    name: 'NFL All Day Rookie Scout',
    description: 'Specializes in identifying high-potential rookie players and their collectible cards for long-term growth.',
    status: 'paused',
    profitLoss: -45.30,
    totalTrades: 12,
    winRate: 58.3,
    lastActivity: '1 hour ago',
    strategy: 'Growth investing in rookie players',
    category: 'NFL All Day',
    tags: ['NFL', 'Rookies', 'Growth'],
    creator: 'NFLInsider',
    performance: {
      dailyPnL: -3.20,
      weeklyPnL: -12.80,
      monthlyPnL: -45.30,
      bestTrade: 18.70,
      worstTrade: -12.40
    }
  },
  {
    id: 'demo_4',
    name: 'Momentum Trader',
    description: 'Follows market momentum and executes quick trades based on volume and price action signals.',
    status: 'active',
    profitLoss: 89.70,
    totalTrades: 89,
    winRate: 72.4,
    lastActivity: '15 minutes ago',
    strategy: 'Technical analysis with momentum indicators',
    category: 'Trading',
    tags: ['Momentum', 'Technical Analysis', 'Quick Trades'],
    creator: 'MomentumKing',
    performance: {
      dailyPnL: 15.60,
      weeklyPnL: 45.20,
      monthlyPnL: 89.70,
      bestTrade: 22.30,
      worstTrade: -7.80
    }
  }
];

// Demo marketplace agents
export const demoMarketplaceAgents: DemoMarketplaceAgent[] = [
  {
    id: 'market_1',
    name: 'NBA Top Shot Value Hunter',
    description: 'Automatically identifies and purchases undervalued NBA Top Shot moments based on player performance and market trends.',
    creator: 'FlowTrader',
    price: 49.99,
    rating: 4.8,
    downloads: 1247,
    category: 'nba-top-shot',
    tags: ['NBA', 'Value Investing', 'Automated'],
    performance: {
      winRate: 78.5,
      totalTrades: 156,
      avgProfit: 23.4
    },
    image: '/api/placeholder/300/200',
    featured: true
  },
  {
    id: 'market_2',
    name: 'Portfolio Optimizer Pro',
    description: 'Advanced portfolio management agent that rebalances your NFT collection for optimal risk-adjusted returns.',
    creator: 'DeFiMaster',
    price: 79.99,
    rating: 4.9,
    downloads: 892,
    category: 'portfolio',
    tags: ['Portfolio', 'Risk Management', 'DeFi'],
    performance: {
      winRate: 82.3,
      totalTrades: 89,
      avgProfit: 31.2
    },
    image: '/api/placeholder/300/200',
    featured: true
  },
  {
    id: 'market_3',
    name: 'NFL All Day Rookie Scout',
    description: 'Specializes in identifying high-potential rookie players and their collectible cards for long-term growth.',
    creator: 'NFLInsider',
    price: 39.99,
    rating: 4.6,
    downloads: 634,
    category: 'nfl-all-day',
    tags: ['NFL', 'Rookies', 'Growth'],
    performance: {
      winRate: 71.8,
      totalTrades: 203,
      avgProfit: 18.7
    },
    image: '/api/placeholder/300/200',
    featured: false
  },
  {
    id: 'market_4',
    name: 'Momentum Trader',
    description: 'Follows market momentum and executes quick trades based on volume and price action signals.',
    creator: 'MomentumKing',
    price: 29.99,
    rating: 4.4,
    downloads: 456,
    category: 'trading',
    tags: ['Momentum', 'Technical Analysis', 'Quick Trades'],
    performance: {
      winRate: 69.2,
      totalTrades: 312,
      avgProfit: 15.8
    },
    image: '/api/placeholder/300/200',
    featured: false
  },
  {
    id: 'market_5',
    name: 'Diamond Hands Holder',
    description: 'Long-term holding strategy agent that identifies fundamentally strong assets and holds through market cycles.',
    creator: 'DiamondHands',
    price: 19.99,
    rating: 4.7,
    downloads: 789,
    category: 'long-term',
    tags: ['Long-term', 'HODL', 'Fundamental Analysis'],
    performance: {
      winRate: 85.1,
      totalTrades: 45,
      avgProfit: 67.3
    },
    image: '/api/placeholder/300/200',
    featured: false
  },
  {
    id: 'market_6',
    name: 'Arbitrage Hunter',
    description: 'Finds price discrepancies across different marketplaces and executes profitable arbitrage trades.',
    creator: 'ArbitrageBot',
    price: 99.99,
    rating: 4.9,
    downloads: 234,
    category: 'arbitrage',
    tags: ['Arbitrage', 'Market Making', 'High Frequency'],
    performance: {
      winRate: 94.2,
      totalTrades: 567,
      avgProfit: 8.7
    },
    image: '/api/placeholder/300/200',
    featured: true
  }
];

// Demo transactions
export const demoTransactions: DemoTransaction[] = [
  {
    id: 'tx_1',
    type: 'buy',
    nftName: 'LeBron James #1',
    nftId: '12345',
    price: 45.50,
    timestamp: '2025-10-05T13:45:00Z',
    status: 'completed',
    gasUsed: 0.001,
    blockHeight: 12345678
  },
  {
    id: 'tx_2',
    type: 'sell',
    nftName: 'Stephen Curry #30',
    nftId: '67890',
    price: 67.20,
    timestamp: '2025-10-05T13:30:00Z',
    status: 'completed',
    gasUsed: 0.001,
    blockHeight: 12345675
  },
  {
    id: 'tx_3',
    type: 'buy',
    nftName: 'Giannis Antetokounmpo #34',
    nftId: '54321',
    price: 89.90,
    timestamp: '2025-10-05T13:15:00Z',
    status: 'pending',
    gasUsed: 0.001,
    blockHeight: 12345672
  }
];

// Demo NFTs
export const demoNFTs: DemoNFT[] = [
  {
    id: 'nft_1',
    name: 'LeBron James #1',
    collection: 'NBA Top Shot',
    image: '/api/placeholder/200/200',
    price: 45.50,
    rarity: 'Common',
    owner: '0x1234...5678',
    lastSale: 42.30,
    marketCap: 1250000
  },
  {
    id: 'nft_2',
    name: 'Stephen Curry #30',
    collection: 'NBA Top Shot',
    image: '/api/placeholder/200/200',
    price: 67.20,
    rarity: 'Rare',
    owner: '0x5678...9012',
    lastSale: 64.50,
    marketCap: 2100000
  },
  {
    id: 'nft_3',
    name: 'Tom Brady #12',
    collection: 'NFL All Day',
    image: '/api/placeholder/200/200',
    price: 89.90,
    rarity: 'Legendary',
    owner: '0x9012...3456',
    lastSale: 85.40,
    marketCap: 3200000
  }
];

// Helper functions
export const getRandomAgent = (): DemoAgent => {
  return demoAgents[Math.floor(Math.random() * demoAgents.length)];
};

export const getRandomMarketplaceAgent = (): DemoMarketplaceAgent => {
  return demoMarketplaceAgents[Math.floor(Math.random() * demoMarketplaceAgents.length)];
};

export const getRandomTransaction = (): DemoTransaction => {
  return demoTransactions[Math.floor(Math.random() * demoTransactions.length)];
};

export const getRandomNFT = (): DemoNFT => {
  return demoNFTs[Math.floor(Math.random() * demoNFTs.length)];
};

// Simulate real-time data updates
export const simulateRealTimeUpdate = (callback: (data: any) => void, interval: number = 5000) => {
  const intervalId = setInterval(() => {
    const randomAgent = getRandomAgent();
    const updatedAgent = {
      ...randomAgent,
      profitLoss: randomAgent.profitLoss + (Math.random() - 0.5) * 10,
      totalTrades: randomAgent.totalTrades + Math.floor(Math.random() * 3),
      lastActivity: 'Just now'
    };
    callback(updatedAgent);
  }, interval);

  return () => clearInterval(intervalId);
};

// Market data simulation
export const getMarketStats = () => {
  return {
    totalVolume: 1250000,
    activeAgents: demoAgents.filter(a => a.status === 'active').length,
    totalAgents: demoAgents.length,
    avgWinRate: demoAgents.reduce((sum, agent) => sum + agent.winRate, 0) / demoAgents.length,
    totalProfit: demoAgents.reduce((sum, agent) => sum + agent.profitLoss, 0)
  };
};
