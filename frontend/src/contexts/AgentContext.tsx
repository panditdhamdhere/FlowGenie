'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface AgentPerformance {
  totalTrades: number;
  successfulTrades: number;
  totalProfit: number;
  winRate: number;
  lastTradeAt?: string;
}

interface AgentSettings {
  maxTradeAmount: number;
  riskTolerance: 'low' | 'medium' | 'high';
  tradingPairs: string[];
  schedule?: {
    enabled: boolean;
    interval: string;
    lastExecuted?: string;
  };
}

interface Agent {
  id: string;
  name: string;
  description: string;
  userId: string;
  prompt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  performance: AgentPerformance;
  settings: AgentSettings;
}

interface AgentCommand {
  type: 'buy' | 'sell' | 'analyze' | 'schedule' | 'stop';
  parameters: Record<string, any>;
  confidence: number;
  reasoning: string;
}

interface AgentContextType {
  agents: Agent[];
  selectedAgent: Agent | null;
  isLoading: boolean;
  error: string | null;
  createAgent: (name: string, description: string, prompt: string, settings?: Partial<AgentSettings>) => Promise<Agent>;
  updateAgent: (agentId: string, updates: Partial<Agent>) => Promise<void>;
  deleteAgent: (agentId: string) => Promise<void>;
  selectAgent: (agent: Agent) => void;
  executeCommand: (agentId: string, command: string) => Promise<AgentCommand[]>;
  executeAgentCommand: (agentId: string, command: AgentCommand) => Promise<any>;
  getAgentPerformance: (agentId: string) => Promise<AgentPerformance>;
  getMarketplaceAgents: () => Promise<Agent[]>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

interface AgentProviderProps {
  children: ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    if (token) {
      loadAgents();
    }
  }, [token]);

  const loadAgents = async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/agents`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setAgents(data.agents);
      } else {
        setError(data.error || 'Failed to load agents');
      }
    } catch (error) {
      console.error('Failed to load agents:', error);
      setError('Failed to load agents');
    } finally {
      setIsLoading(false);
    }
  };

  const createAgent = async (
    name: string,
    description: string,
    prompt: string,
    settings?: Partial<AgentSettings>
  ): Promise<Agent> => {
    if (!token) {
      throw new Error('Must be logged in to create agents');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          prompt,
          settings,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create agent');
      }

      const newAgent = data.agent;
      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    }
  };

  const updateAgent = async (agentId: string, updates: Partial<Agent>): Promise<void> => {
    if (!token) {
      throw new Error('Must be logged in to update agents');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update agent');
      }

      setAgents(prev => prev.map(agent => 
        agent.id === agentId ? { ...agent, ...updates, updatedAt: new Date().toISOString() } : agent
      ));

      if (selectedAgent?.id === agentId) {
        setSelectedAgent(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null);
      }
    } catch (error) {
      console.error('Failed to update agent:', error);
      throw error;
    }
  };

  const deleteAgent = async (agentId: string): Promise<void> => {
    if (!token) {
      throw new Error('Must be logged in to delete agents');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete agent');
      }

      setAgents(prev => prev.filter(agent => agent.id !== agentId));

      if (selectedAgent?.id === agentId) {
        setSelectedAgent(null);
      }
    } catch (error) {
      console.error('Failed to delete agent:', error);
      throw error;
    }
  };

  const selectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const executeCommand = async (agentId: string, command: string): Promise<AgentCommand[]> => {
    if (!token) {
      throw new Error('Must be logged in to execute commands');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ command }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to execute command');
      }

      return data.commands;
    } catch (error) {
      console.error('Failed to execute command:', error);
      throw error;
    }
  };

  const executeAgentCommand = async (agentId: string, command: AgentCommand): Promise<any> => {
    if (!token) {
      throw new Error('Must be logged in to execute commands');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(command),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to execute agent command');
      }

      // Refresh agents to update performance metrics
      await loadAgents();

      return data.result;
    } catch (error) {
      console.error('Failed to execute agent command:', error);
      throw error;
    }
  };

  const getAgentPerformance = async (agentId: string): Promise<AgentPerformance> => {
    if (!token) {
      throw new Error('Must be logged in to get performance');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}/performance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get performance');
      }

      return data.performance;
    } catch (error) {
      console.error('Failed to get performance:', error);
      throw error;
    }
  };

  const getMarketplaceAgents = async (): Promise<Agent[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/marketplace/public`);

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get marketplace agents');
      }

      return data.agents;
    } catch (error) {
      console.error('Failed to get marketplace agents:', error);
      throw error;
    }
  };

  const value: AgentContextType = {
    agents,
    selectedAgent,
    isLoading,
    error,
    createAgent,
    updateAgent,
    deleteAgent,
    selectAgent,
    executeCommand,
    executeAgentCommand,
    getAgentPerformance,
    getMarketplaceAgents,
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
