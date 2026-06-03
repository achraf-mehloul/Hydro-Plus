import React from 'react';
import Sidebar from '../components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 mr-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}