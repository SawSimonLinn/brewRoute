"use client";

import { useCallback } from 'react';
import type { Favorite } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { useCafeContext } from '@/context/cafe-context';

const FAVORITES_KEY = 'brewroute-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Favorite[]>(FAVORITES_KEY, []);
  const { toast } = useToast();
  const { setCafes } = useCafeContext();

  const isFavorite = useCallback(
    (place_id: string) => {
      return favorites.some((fav) => fav.place_id === place_id);
    },
    [favorites]
  );

  const addFavorite = useCallback(
    (cafe: { place_id: string; name: string; vicinity: string; rating?: number; }) => {
      if (!isFavorite(cafe.place_id)) {
        const newFavorite: Favorite = {
          ...cafe,
          savedAt: new Date().toISOString(),
        };
        setFavorites((prev) => [newFavorite, ...prev]);
        setCafes(cafes => cafes.map(c => c.place_id === cafe.place_id ? {...c, isFavorite: true} : c));
        toast({
            title: "Added to Favorites",
            description: `${cafe.name} has been saved.`,
        });
      }
    },
    [isFavorite, setFavorites, toast, setCafes]
  );

  const removeFavorite = useCallback(
    (place_id: string) => {
      const cafeName = favorites.find(fav => fav.place_id === place_id)?.name;
      setFavorites((prev) => prev.filter((fav) => fav.place_id !== place_id));
      setCafes(cafes => cafes.map(c => c.place_id === place_id ? {...c, isFavorite: false} : c));
      if (cafeName) {
        toast({
            title: "Removed from Favorites",
            description: `${cafeName} has been removed.`,
            variant: "destructive",
        });
      }
    },
    [favorites, setFavorites, toast, setCafes]
  );

  const toggleFavorite = useCallback(
    (cafe: { place_id: string; name: string; vicinity: string; rating?: number; }) => {
      if (isFavorite(cafe.place_id)) {
        removeFavorite(cafe.place_id);
      } else {
        addFavorite(cafe);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
