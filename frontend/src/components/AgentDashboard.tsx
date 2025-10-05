'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { demoAgents, DemoAgent } from '@/services/demoData';
import { RealTimeUpdates } from './RealTimeUpdates';
import { 
  Bot, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Activity,
  Eye,
  Share2,
  BarChart3,
  Clock,
  Target
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'stopped';
  profitLoss: number;
  totalTrades: number;
  winRate: number;
  lastActivity: string;
  strategy: string;
}

export function AgentDashboard() {
  const { user, token } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    strategy: ''
  });
  const [creating, setCreating] = useState(false);

  // Use demo data service

  useEffect(() => {
    fetchAgents();
  }, [user, token]);

  const fetchAgents = async () => {
    if (!user || !token) {
      setAgents(demoAgents);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/agents', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAgents(data.agents || []);
      } else {
        // Fallback to demo data if API fails
        setAgents(demoAgents);
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      // Fallback to demo data
      setAgents(demoAgents);
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async () => {
    if (!user || !token) {
      setError('Please log in to create agents');
      return;
    }

    if (!createForm.name || !createForm.description || !createForm.strategy) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setCreating(true);
      setError('');

      const response = await fetch('http://localhost:3001/api/agents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: createForm.name,
          description: createForm.description,
          prompt: createForm.strategy,
          settings: {
            maxTradeAmount: 100,
            riskTolerance: 'medium',
            tradingPairs: ['NBA_TOP_SHOT', 'NFL_ALL_DAY']
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the new agent to the list
        const newAgent: Agent = {
          id: data.agent.id,
          name: data.agent.name,
          description: data.agent.description,
          status: 'active',
          profitLoss: 0,
          totalTrades: 0,
          winRate: 0,
          lastActivity: 'Just now',
          strategy: data.agent.prompt
        };
        setAgents([newAgent, ...agents]);
        setShowCreateModal(false);
        setCreateForm({ name: '', description: '', strategy: '' });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create agent');
      }
    } catch (error) {
      console.error('Failed to create agent:', error);
      setError('Failed to create agent. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === id) {
        const newStatus = agent.status === 'active' ? 'paused' : 'active';
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'stopped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProfitLossColor = (amount: number) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My AI Agents</h2>
          <p className="text-gray-600">
            {user ? 'Manage and monitor your autonomous trading agents' : 'Demo Mode - Sign in to create your own agents'}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Agent
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Loading agents...
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Stats Overview */}
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
              <p className="text-sm font-medium text-gray-600">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.filter(a => a.status === 'active').length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total P&L</p>
              <p className={`text-2xl font-bold ${getProfitLossColor(
                agents.reduce((sum, agent) => sum + agent.profitLoss, 0)
              )}`}>
                ${agents.reduce((sum, agent) => sum + agent.profitLoss, 0).toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Win Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {(agents.reduce((sum, agent) => sum + agent.winRate, 0) / agents.length).toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Real-time Updates */}
      <div className="mb-8">
        <RealTimeUpdates />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            {/* Agent Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleAgentStatus(agent.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      agent.status === 'active' 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {agent.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Agent Stats */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">P&L</p>
                  <p className={`text-lg font-semibold ${getProfitLossColor(agent.profitLoss)}`}>
                    ${agent.profitLoss.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Trades</p>
                  <p className="text-lg font-semibold text-gray-900">{agent.totalTrades}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Win Rate</p>
                  <p className="text-lg font-semibold text-gray-900">{agent.winRate}%</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Activity</p>
                  <p className="text-lg font-semibold text-gray-900">{agent.lastActivity}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Strategy</p>
                <p className="text-sm text-gray-700">{agent.strategy}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Analytics
                </button>
                <button className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New AI Agent</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., NBA Top Shot Hunter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe what this agent will do..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trading Strategy</label>
                <input
                  type="text"
                  value={createForm.strategy}
                  onChange={(e) => setCreateForm({...createForm, strategy: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Buy undervalued NBA moments under $50"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setCreateForm({ name: '', description: '', strategy: '' });
                  setError('');
                }}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createAgent}
                disabled={creating}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Agent'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
