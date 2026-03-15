import SuperAdminSidebar from '@/components/superadmin/SuperAdminSidebar';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SuperAdminSidebar />
      <main className="flex-1 ml-64 min-h-screen p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
