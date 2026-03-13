import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VehicleOverviewTab from './VehicleOverviewTab';
import VehicleDocumentsTab from './VehicleDocumentsTab';
import VehicleMaintenanceTab from './VehicleMaintenanceTab';
import VehicleFuelTab from './VehicleFuelTab';
import VehicleMissionsTab from './VehicleMissionsTab';
import VehicleCostsTab from './VehicleCostsTab';
import VehicleTimelineTab from './VehicleTimelineTab';

export default function VehicleTabs({ vehicleId }: { vehicleId: string }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="fuel">Fuel & Consumption</TabsTrigger>
        <TabsTrigger value="missions">Missions</TabsTrigger>
        <TabsTrigger value="costs">Costs</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><VehicleOverviewTab vehicleId={vehicleId} /></TabsContent>
      <TabsContent value="documents"><VehicleDocumentsTab vehicleId={vehicleId} /></TabsContent>
      <TabsContent value="maintenance"><VehicleMaintenanceTab vehicleId={vehicleId} /></TabsContent>
      <TabsContent value="fuel"><VehicleFuelTab vehicleId={vehicleId} /></TabsContent>
      <TabsContent value="missions"><VehicleMissionsTab vehicleId={vehicleId} /></TabsContent>
      <TabsContent value="costs"><VehicleCostsTab vehicleId={vehicleId} /></TabsContent>
      <TabsContent value="timeline"><VehicleTimelineTab vehicleId={vehicleId} /></TabsContent>
    </Tabs>
  );
}
