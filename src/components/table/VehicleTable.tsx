import React from 'react';
import { useVehicles } from '@/hooks/useVehicles';
import { useRouter } from 'next/navigation';
import { Loader2, Eye } from 'lucide-react';
import { AlertBadge } from '@/components/ui/AlertBadge';

export default function VehicleTable() {
  const { data, isLoading, isError } = useVehicles();
  const router = useRouter();

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>;
  if (isError) return <div className="text-red-600">Failed to load vehicles.</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 uppercase">
            <th className="py-2 px-3 text-left">Name</th>
            <th className="py-2 px-3 text-left">Plate</th>
            <th className="py-2 px-3 text-left">Model</th>
            <th className="py-2 px-3 text-left">Kilometrage</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.vehicles.map((v) => (
            <tr key={v.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/vehicles/${v.id}`)}>
              <td className="py-2 px-3 font-medium">{v.name}</td>
              <td className="py-2 px-3">{v.plateNumber}</td>
              <td className="py-2 px-3">{v.model}</td>
              <td className="py-2 px-3">{v.kilometrage.toLocaleString()} km</td>
              <td className="py-2 px-3"><AlertBadge status={v.status} /></td>
              <td className="py-2 px-3">
                <button className="p-1 hover:bg-gray-100 rounded" onClick={e => { e.stopPropagation(); router.push(`/vehicles/${v.id}`); }}>
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
