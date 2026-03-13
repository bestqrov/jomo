import React from 'react';
import { Card } from '@/components/ui/card';

export default function VehicleCostsTab({ vehicleId }: { vehicleId: string }) {
  // Placeholder: Fetch costs
  const costs = [
    { label: 'Fuel Cost', value: '€1,200' },
    { label: 'Maintenance Cost', value: '€800' },
    { label: 'Autoroute Cost', value: '€150' },
    { label: 'Taxes', value: '€300' },
    { label: 'Insurance', value: '€400' },
  ];
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">Costs</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {costs.map((cost) => (
          <div key={cost.label} className="flex justify-between text-sm border-b pb-1">
            <span>{cost.label}</span>
            <span className="font-semibold">{cost.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
