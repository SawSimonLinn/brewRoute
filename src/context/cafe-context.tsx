"use client";

import { createContext, useContext, useState, useMemo, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import type { Cafe } from '@/lib/types';

type CafeContextType = {
  cafes: Cafe[];
  setCafes: Dispatch<SetStateAction<Cafe[]>>;
  selectedCafeId: string | null;
  setSelectedCafeId: Dispatch<SetStateAction<string | null>>;
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
  placesService: google.maps.places.PlacesService | null;
  setPlacesService: Dispatch<SetStateAction<google.maps.places.PlacesService | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
};

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export function CafeProvider({ children }: { children: ReactNode }) {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  const value = useMemo(
    () => ({
      cafes,
      setCafes,
      selectedCafeId,
      setSelectedCafeId,
      map,
      setMap,
      placesService,
      setPlacesService,
      isLoading,
      setIsLoading,
      keyword,
      setKeyword,
    }),
    [cafes, selectedCafeId, map, placesService, isLoading, keyword]
  );

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

export function useCafeContext() {
  const context = useContext(CafeContext);
  if (context === undefined) {
    throw new Error('useCafeContext must be used within a CafeProvider');
  }
  return context;
}
