import React from 'react';
import VehicleHeader from '@/components/vehicle/VehicleHeader';
import VehicleStats from '@/components/vehicle/VehicleStats';
import VehicleTabs from '@/components/vehicle/VehicleTabs';

export default function Vehicle360Page({ params }: { params: { id: string } }) {
  // Fetch vehicle data here (React Query or server-side)
  const vehicleId = params.id;
  // Placeholder: Replace with actual data fetching
  const vehicle = { id: vehicleId, name: 'Toyota Hilux', status: 'Active', kilometrage: 120000 };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      <VehicleHeader vehicle={vehicle} />
      <VehicleStats vehicle={vehicle} />
      <VehicleTabs vehicleId={vehicleId} />
    </div>
  );
}
