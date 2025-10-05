'use client';

import React from 'react';
import { TrendingUp, Users, Bot, DollarSign } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      icon: Bot,
      value: '1,247',
      label: 'Active Agents',
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      icon: DollarSign,
      value: '$2.4M',
      label: 'Total Volume',
      change: '+156%',
      changeType: 'positive' as const,
    },
    {
      icon: Users,
      value: '892',
      label: 'Traders',
      change: '+45%',
      changeType: 'positive' as const,
    },
    {
      icon: TrendingUp,
      value: '73.2%',
      label: 'Success Rate',
      change: '+8.5%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 mb-2 font-medium">{stat.label}</div>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
