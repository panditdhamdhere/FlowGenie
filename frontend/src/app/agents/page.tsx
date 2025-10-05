import React from 'react';
import { Header } from '@/components/Header';
import { AgentDashboard } from '@/components/AgentDashboard';

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <AgentDashboard />
      </main>
    </div>
  );
}
