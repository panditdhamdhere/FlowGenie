import React from 'react';
import { AgentDashboard } from '@/components/AgentDashboard';
import { Header } from '@/components/Header';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <AgentDashboard />
      </main>
    </div>
  );
}
