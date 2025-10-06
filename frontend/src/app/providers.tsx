'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FlowProvider } from '@/contexts/FlowContext';
import { AgentProvider } from '@/contexts/AgentContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastContainer, useToast } from '@/components/Toast';

interface ProvidersProps {
  children: React.ReactNode;
}

function AppWithToast({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useToast();

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FlowProvider>
          <AgentProvider>
            <AppWithToast>
              {children}
            </AppWithToast>
          </AgentProvider>
        </FlowProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
