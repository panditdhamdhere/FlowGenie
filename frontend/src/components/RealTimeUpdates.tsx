'use client';

import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { demoTransactions, DemoTransaction } from '@/services/demoData';

export function RealTimeUpdates() {
  const [transactions, setTransactions] = useState<DemoTransaction[]>(demoTransactions);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate new transaction
      const newTransaction: DemoTransaction = {
        id: `tx_${Date.now()}`,
        type: Math.random() > 0.5 ? 'buy' : 'sell',
        nftName: `Player #${Math.floor(Math.random() * 1000)}`,
        nftId: Math.floor(Math.random() * 100000).toString(),
        price: Math.floor(Math.random() * 100) + 10,
        timestamp: new Date().toISOString(),
        status: 'completed',
        gasUsed: 0.001,
        blockHeight: 12345678 + Math.floor(Math.random() * 100)
      };

      setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
    }, 8000); // New transaction every 8 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy': return 'text-green-600 bg-green-100';
      case 'sell': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy': return '↗';
      case 'sell': return '↘';
      default: return '↔';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Live Trading Activity</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-600">
            {isLive ? 'Live' : 'Paused'}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getTypeColor(transaction.type)}`}>
                {getTypeIcon(transaction.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.nftName}</p>
                <p className="text-xs text-gray-500">
                  {transaction.type === 'buy' ? 'Purchased' : 'Sold'} • {transaction.collection || 'NFT'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                ${transaction.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                <Clock className="w-3 h-3 inline mr-1" />
                {new Date(transaction.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">24h Volume</p>
            <p className="text-lg font-semibold text-gray-900">$12.4K</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Active Trades</p>
            <p className="text-lg font-semibold text-gray-900">47</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Price</p>
            <p className="text-lg font-semibold text-gray-900">$67.50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
