import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function useClients(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['clients', params],
    queryFn: async () => {
      const { data } = await axios.get<{ clients: Client[]; total: number }>(
        '/api/v1/clients',
        { params }
      );
      return data;
    },
  });
}
