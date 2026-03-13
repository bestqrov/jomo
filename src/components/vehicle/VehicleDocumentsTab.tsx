import React from 'react';
import { Card } from '@/components/ui/card';

const documentTypes = [
  'Vignettes',
  'Cartes Grises',
  'Assurances',
  'Visites Techniques',
  'Permis Circulation',
  'Autorisations Circulation',
  'Carnets Metrologiques',
  'Extincteurs',
];

export default function VehicleDocumentsTab({ vehicleId }: { vehicleId: string }) {
  // Placeholder: Fetch documents for each type
  return (
    <div className="grid grid-cols-1 gap-6">
      {documentTypes.map((type) => (
        <Card key={type} className="p-4">
          <div className="font-semibold mb-2">{type}</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-1">Number</th>
                  <th className="text-left py-1">Expiration</th>
                  <th className="text-left py-1">Status</th>
                  <th className="text-left py-1">Alert</th>
                </tr>
              </thead>
              <tbody>
                {/* Placeholder row */}
                <tr>
                  <td>ABC123</td>
                  <td>2026-04-01</td>
                  <td className="text-green-600">Valid</td>
                  <td className="text-red-600">Expires soon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}
