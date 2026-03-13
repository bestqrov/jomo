import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fuelData = [
  { month: 'Jan', liters: 120 },
  { month: 'Feb', liters: 110 },
  { month: 'Mar', liters: 130 },
];

export default function VehicleFuelTab({ vehicleId }: { vehicleId: string }) {
  // Placeholder: Fetch fuel fillups, analytics
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="font-semibold mb-2">Fuel Fillups</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-1">Date</th>
              <th className="text-left py-1">Liters</th>
              <th className="text-left py-1">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-03-10</td>
              <td>50</td>
              <td>€80</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <Card className="p-4">
        <div className="font-semibold mb-2">Fuel Analytics</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={fuelData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="liters" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
