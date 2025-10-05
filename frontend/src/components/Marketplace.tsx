'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  Bot,
  Download,
  Heart,
  Share2,
  BarChart3,
  Zap,
  Shield,
  Target
} from 'lucide-react';

interface MarketplaceAgent {
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

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const agents: MarketplaceAgent[] = [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
      id: '4',
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
      id: '5',
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
      id: '6',
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

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'nba-top-shot', name: 'NBA Top Shot' },
    { id: 'nfl-all-day', name: 'NFL All Day' },
    { id: 'portfolio', name: 'Portfolio Management' },
    { id: 'trading', name: 'Trading Strategies' },
    { id: 'arbitrage', name: 'Arbitrage' },
    { id: 'long-term', name: 'Long-term Investing' }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'performance':
        return b.performance.winRate - a.performance.winRate;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Agent Marketplace</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover, purchase, and deploy AI trading agents created by the FlowGenie community. 
          Each agent is battle-tested and ready to start trading autonomously.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search agents, creators, or strategies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="rating">Sort by Rating</option>
              <option value="downloads">Sort by Downloads</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="performance">Sort by Performance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Agents</p>
              <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
            </div>
            <Bot className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured Agents</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.filter(a => a.featured).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.reduce((sum, agent) => sum + agent.downloads, 0).toLocaleString()}
              </p>
            </div>
            <Download className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Featured Agents */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Agents</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {agents.filter(agent => agent.featured).map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
              {agent.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                  Featured
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {agent.creator}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 ml-1">{agent.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{agent.downloads} downloads</span>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{agent.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Win Rate</p>
                    <p className="text-sm font-semibold text-gray-900">{agent.performance.winRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Trades</p>
                    <p className="text-sm font-semibold text-gray-900">{agent.performance.totalTrades}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Profit</p>
                    <p className="text-sm font-semibold text-green-600">${agent.performance.avgProfit}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">${agent.price}</div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm font-medium">
                      <BarChart3 className="w-4 h-4 inline mr-1" />
                      Preview
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium">
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Agents */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Agents ({sortedAgents.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {agent.creator}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 ml-1">{agent.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{agent.downloads}</span>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">{agent.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {agent.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{agent.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-gray-900">${agent.price}</div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm">
                      Preview
                    </button>
                    <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
