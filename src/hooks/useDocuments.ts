import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface DocumentItem {
  id: string;
  type: string;
  vehicleId: string;
  expirationDate: string;
  status: string;
}

export function useDocuments(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['documents', params],
    queryFn: async () => {
      const { data } = await axios.get<{ documents: DocumentItem[]; total: number }>(
        '/api/v1/administratif/documents',
        { params }
      );
      return data;
    },
  });
}
