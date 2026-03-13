import React from 'react';

export default function VehicleHeader({ vehicle }: { vehicle: any }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">{vehicle.name}</h1>
        <div className="text-sm text-gray-500">ID: {vehicle.id}</div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${vehicle.status === 'Active' ? 'primary-100 text-primary-700' : 'gray-200 text-gray-600'}`}>{vehicle.status}</span>
    </div>
  );
}
