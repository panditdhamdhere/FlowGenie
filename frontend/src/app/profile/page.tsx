import React from 'react';
import { Header } from '@/components/Header';
import { Profile } from '@/components/Profile';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Profile />
      </main>
    </div>
  );
}
