'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface FlowAccount {
  address: string;
  balance: {
    flow: string;
    usd: string;
    nfts: {
      nbaTopShot: number;
      nflAllDay: number;
      total: number;
    };
  };
}

interface FlowNetwork {
  network: string;
  accessNode: string;
  status: string;
  latestBlock: {
    height: number;
    timestamp: string;
  };
  gasPrice: string;
  supportedContracts: string[];
}

interface FlowTransaction {
  id: string;
  type: string;
  status: string;
  amount: number;
  nftId?: string;
  nftName?: string;
  timestamp: string;
  blockHeight: number;
}

interface FlowContextType {
  account: FlowAccount | null;
  network: FlowNetwork | null;
  transactions: FlowTransaction[];
  isConnected: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getBalance: () => Promise<void>;
  getTransactions: () => Promise<void>;
  executeTransaction: (type: string, parameters: Record<string, any>) => Promise<any>;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

interface FlowProviderProps {
  children: ReactNode;
}

export function FlowProvider({ children }: FlowProviderProps) {
  const [account, setAccount] = useState<FlowAccount | null>(null);
  const [network, setNetwork] = useState<FlowNetwork | null>(null);
  const [transactions, setTransactions] = useState<FlowTransaction[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    if (user?.flowAddress) {
      setIsConnected(true);
      getBalance();
      getTransactions();
    }
    getNetworkInfo();
  }, [user]);

  const getNetworkInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/flow/network`);
      const data = await response.json();

      if (data.success) {
        setNetwork(data.network);
      }
    } catch (error) {
      console.error('Failed to fetch network info:', error);
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would integrate with FCL wallet discovery
      // For now, we'll simulate wallet connection
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      if (token) {
        await fetch(`${API_BASE_URL}/flow/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ flowAddress: mockAddress }),
        });
      }

      setAccount({
        address: mockAddress,
        balance: {
          flow: '1000.50',
          usd: '1000.50',
          nfts: {
            nbaTopShot: 5,
            nflAllDay: 2,
            total: 7
          }
        }
      });

      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setTransactions([]);
  };

  const getBalance = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/flow/balance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setAccount(prev => prev ? {
          ...prev,
          balance: data.balance
        } : null);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const getTransactions = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/flow/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const executeTransaction = async (type: string, parameters: Record<string, any>) => {
    if (!token) {
      throw new Error('Must be connected to execute transactions');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/flow/actions/${type}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ parameters }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Transaction failed');
      }

      // Refresh balance and transactions after successful transaction
      await getBalance();
      await getTransactions();

      return data.result;
    } catch (error) {
      console.error('Transaction execution failed:', error);
      throw error;
    }
  };

  const value: FlowContextType = {
    account,
    network,
    transactions,
    isConnected,
    isLoading,
    connectWallet,
    disconnectWallet,
    getBalance,
    getTransactions,
    executeTransaction,
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
}
