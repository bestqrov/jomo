import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Vehicle {
  id: string;
  name: string;
  plateNumber: string;
  model: string;
  kilometrage: number;
  status: string;
}

export function useVehicles(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['vehicles', params],
    queryFn: async () => {
      const { data } = await axios.get<{ vehicles: Vehicle[]; total: number }>(
        '/api/v1/flotte/vehicles',
        { params }
      );
      return data;
    },
  });
}
