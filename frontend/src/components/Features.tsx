'use client';

import React from 'react';
import { 
  Brain, 
  Zap, 
  Shield, 
  Clock, 
  BarChart3, 
  Users, 
  Smartphone,
  Globe
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Trading',
      description: 'Natural language processing enables complex trading strategies with simple commands.',
      details: [
        'Understands market sentiment',
        'Analyzes price trends',
        'Executes risk management',
        'Adapts to market conditions'
      ]
    },
    {
      icon: Zap,
      title: 'Flow Actions Integration',
      description: 'Leverage Flow Actions (FLIP-338) for composable, atomic transactions.',
      details: [
        'Atomic transaction safety',
        'Cross-contract composability',
        'Gas-efficient operations',
        'Secure execution environment'
      ]
    },
    {
      icon: Shield,
      title: 'Secure & Trustless',
      description: 'All transactions are executed on-chain with transparent, verifiable results.',
      details: [
        'On-chain verification',
        'Transparent execution',
        'No custodial risks',
        'Decentralized infrastructure'
      ]
    },
    {
      icon: Clock,
      title: 'Scheduled Transactions',
      description: 'Set up recurring trades and automated strategies that run on schedule.',
      details: [
        'Dollar-cost averaging',
        'Automated rebalancing',
        'Time-based triggers',
        'Flexible scheduling'
      ]
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Comprehensive dashboards track agent performance and trading metrics.',
      details: [
        'Real-time P&L tracking',
        'Win rate analysis',
        'Risk-adjusted returns',
        'Historical performance'
      ]
    },
    {
      icon: Users,
      title: 'Agent Marketplace',
      description: 'Discover, share, and monetize successful trading strategies.',
      details: [
        'Public agent discovery',
        'Performance leaderboards',
        'Strategy sharing',
        'Community insights'
      ]
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Support',
      description: 'Access your agents and trading data from any device, anywhere.',
      details: [
        'Mobile-responsive design',
        'Real-time notifications',
        'Cross-device sync',
        'Offline capability'
      ]
    },
    {
      icon: Globe,
      title: 'Multi-Market Access',
      description: 'Trade across NBA Top Shot, NFL All Day, and emerging Flow NFT markets.',
      details: [
        'NBA Top Shot integration',
        'NFL All Day support',
        'Emerging marketplace access',
        'DeFi protocol integration'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trade Like a Pro
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FlowGenie combines the power of AI, blockchain technology, and automated trading 
            to create the most advanced NFT trading platform on Flow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Trading with AI?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of traders who are already using FlowGenie to automate their 
              NFT trading strategies and maximize their returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Create Your First Agent
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
