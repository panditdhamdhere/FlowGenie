import React from 'react';
import { Header } from '@/components/Header';
import { Analytics } from '@/components/Analytics';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Analytics />
      </main>
    </div>
  );
}
