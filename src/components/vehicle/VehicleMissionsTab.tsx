import React from 'react';
import { Card } from '@/components/ui/card';

export default function VehicleMissionsTab({ vehicleId }: { vehicleId: string }) {
  // Placeholder: Fetch missions
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">Missions</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-1">Date</th>
            <th className="text-left py-1">Status</th>
            <th className="text-left py-1">Driver</th>
            <th className="text-left py-1">Client</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2026-03-12</td>
            <td className="text-blue-600">Planned</td>
            <td>John Doe</td>
            <td>Acme Corp</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
