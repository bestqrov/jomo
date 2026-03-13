import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Mission {
  id: string;
  vehicleId: string;
  driverId: string;
  clientId: string;
  status: string;
  date: string;
}

export function useMissions(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['missions', params],
    queryFn: async () => {
      const { data } = await axios.get<{ missions: Mission[]; total: number }>(
        '/api/v1/transport/missions',
        { params }
      );
      return data;
    },
  });
}
