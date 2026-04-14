"use client";

import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminTopbar from '@/components/layout/AdminTopbar';
import React, { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: Replace with global/profile state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [steName, setSteName] = useState('Sud Tours');
  const [adminName, setAdminName] = useState('Abdessamad X');

  // In a real app, these would be updated from settings/profile context or API

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-60 min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <AdminTopbar logoUrl={logoUrl} steName={steName} adminName={adminName} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
