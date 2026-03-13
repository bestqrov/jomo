import React from 'react';
import { Card } from '@/components/ui/card';

const timeline = [
  { date: '2026-03-01', type: 'Maintenance', description: 'Oil Change' },
  { date: '2026-03-10', type: 'Fuel', description: '50L fillup' },
  { date: '2026-03-12', type: 'Mission', description: 'Delivery to Acme Corp' },
  { date: '2026-03-15', type: 'Document', description: 'Insurance renewed' },
];

export default function VehicleTimelineTab({ vehicleId }: { vehicleId: string }) {
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">Timeline</div>
      <ol className="relative border-l border-gray-200">
        {timeline.map((event, i) => (
          <li key={i} className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-1.5 border border-white"></div>
            <time className="mb-1 text-xs font-normal leading-none text-gray-400">{event.date}</time>
            <div className="text-sm font-semibold">{event.type}</div>
            <div className="text-xs text-gray-600">{event.description}</div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
