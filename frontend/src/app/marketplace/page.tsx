import React from 'react';
import { Header } from '@/components/Header';
import { Marketplace } from '@/components/Marketplace';

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Marketplace />
      </main>
    </div>
  );
}
