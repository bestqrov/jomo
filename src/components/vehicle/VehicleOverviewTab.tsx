import React from 'react';
import { Card } from '@/components/ui/card';

export default function VehicleOverviewTab({ vehicleId }: { vehicleId: string }) {
  // Placeholder: Fetch vehicle info, status, kilometrage, next maintenance, document alerts
  const info = {
    registration: '123-XYZ',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2021,
    status: 'Active',
    kilometrage: 120000,
    nextMaintenance: '130,000 km',
    alerts: ['Insurance expires in 10 days', 'Technical inspection due soon'],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="font-semibold mb-2">Vehicle Information</div>
        <div className="text-sm text-gray-600">{info.brand} {info.model} ({info.year})</div>
        <div className="text-xs text-gray-400">Registration: {info.registration}</div>
        <div className="text-xs text-gray-400">Status: {info.status}</div>
        <div className="text-xs text-gray-400">Kilometrage: {info.kilometrage} km</div>
        <div className="text-xs text-gray-400">Next Maintenance: {info.nextMaintenance}</div>
      </Card>
      <Card className="p-4">
        <div className="font-semibold mb-2">Document Alerts</div>
        <ul className="list-disc pl-5 text-sm text-red-600">
          {info.alerts.map((alert, i) => <li key={i}>{alert}</li>)}
        </ul>
      </Card>
    </div>
  );
}
