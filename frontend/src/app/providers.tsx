'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FlowProvider } from '@/contexts/FlowContext';
import { AgentProvider } from '@/contexts/AgentContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <FlowProvider>
        <AgentProvider>
          {children}
        </AgentProvider>
      </FlowProvider>
    </AuthProvider>
  );
}
