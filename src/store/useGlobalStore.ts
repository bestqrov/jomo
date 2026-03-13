import { create } from 'zustand';

interface GlobalState {
  selectedVehicle?: string;
  searchQuery: string;
  alerts: any[];
  userSession?: any;
  setSelectedVehicle: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setAlerts: (alerts: any[]) => void;
  setUserSession: (session: any) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  selectedVehicle: undefined,
  searchQuery: '',
  alerts: [],
  userSession: undefined,
  setSelectedVehicle: (id) => set({ selectedVehicle: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAlerts: (alerts) => set({ alerts }),
  setUserSession: (session) => set({ userSession: session }),
}));
