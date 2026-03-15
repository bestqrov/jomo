import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-60 min-h-screen p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
