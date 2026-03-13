import React from 'react';
import { Card } from '@/components/ui/card';

export default function VehicleStats({ vehicle }: { vehicle: any }) {
  // Placeholder stats
  const stats = [
    { label: 'Kilometrage', value: vehicle.kilometrage + ' km' },
    { label: 'Next Maintenance', value: '30,000 km' },
    { label: 'Alerts', value: '2', highlight: true },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className={`p-4 rounded-lg shadow-sm ${stat.highlight ? 'bg-red-50 border-red-200' : ''}`}>
          <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
          <div className="text-xl font-semibold">{stat.value}</div>
        </Card>
      ))}
    </div>
  );
}
