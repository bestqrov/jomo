import React from 'react';
import { Card } from '@/components/ui/card';

const maintenanceTypes = [
  'Interventions',
  'Diagnostiques',
  'Entretiens',
  'Plan Entretien',
];

export default function VehicleMaintenanceTab({ vehicleId }: { vehicleId: string }) {
  // Placeholder: Fetch maintenance records for each type
  return (
    <div className="grid grid-cols-1 gap-6">
      {maintenanceTypes.map((type) => (
        <Card key={type} className="p-4">
          <div className="font-semibold mb-2">{type}</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-1">Date</th>
                  <th className="text-left py-1">Type</th>
                  <th className="text-left py-1">Status</th>
                  <th className="text-left py-1">Details</th>
                </tr>
              </thead>
              <tbody>
                {/* Placeholder row */}
                <tr>
                  <td>2026-03-01</td>
                  <td>Oil Change</td>
                  <td className="text-green-600">Completed</td>
                  <td>Changed oil and filter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}
