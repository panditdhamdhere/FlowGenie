'use client';

import React from 'react';
import { Star, Copy, Play } from 'lucide-react';

export function AgentShowcase() {
  const showcaseAgents = [
    {
      id: 1,
      name: 'TopShot Value Hunter',
      description: 'Finds undervalued NBA Top Shot moments with high upside potential',
      creator: 'CryptoTrader',
      performance: {
        totalTrades: 247,
        winRate: 78.5,
        totalProfit: 15420,
        avgReturn: 12.3
      },
      tags: ['NBA Top Shot', 'Value Investing', 'High Volume'],
      isVerified: true,
      rating: 4.9,
      reviews: 156
    },
    {
      id: 2,
      name: 'Momentum Trader Pro',
      description: 'Executes momentum-based strategies on trending NFT collections',
      creator: 'NFTWhale',
      performance: {
        totalTrades: 189,
        winRate: 71.2,
        totalProfit: 8930,
        avgReturn: 8.7
      },
      tags: ['Momentum', 'Trend Following', 'Quick Trades'],
      isVerified: true,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      name: 'DeFi Yield Optimizer',
      description: 'Automatically rebalances DeFi positions for optimal yield',
      creator: 'YieldFarmer',
      performance: {
        totalTrades: 95,
        winRate: 92.1,
        totalProfit: 6750,
        avgReturn: 15.2
      },
      tags: ['DeFi', 'Yield Farming', 'Risk Management'],
      isVerified: false,
      rating: 4.6,
      reviews: 43
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Performing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most successful trading agents in our marketplace. 
            Copy their strategies or get inspired to create your own.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {showcaseAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Agent Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {agent.name}
                    </h3>
                    {agent.isVerified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white fill-current" />
                  </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{agent.rating}</span>
                    <span>({agent.reviews})</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {agent.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <span>by</span>
                  <span className="font-medium text-gray-900 ml-1">{agent.creator}</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {agent.performance.totalTrades}
                    </div>
                    <div className="text-sm text-gray-500">Total Trades</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {agent.performance.winRate}%
                    </div>
                    <div className="text-sm text-gray-500">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      ${agent.performance.totalProfit.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Total Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {agent.performance.avgReturn}%
                    </div>
                    <div className="text-sm text-gray-500">Avg Return</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Deploy</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marketplace CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Explore More Agents
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse hundreds of AI agents created by our community. 
              Find strategies that match your trading style and risk tolerance.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
              Browse Marketplace
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
