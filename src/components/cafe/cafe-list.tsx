"use client";

import { useCafeContext } from '@/context/cafe-context';
import { CafeCard } from './cafe-card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Frown } from 'lucide-react';

type CafeListProps = {
    onCafeSelect: (id: string | null) => void;
}

export function CafeList({ onCafeSelect }: CafeListProps) {
  const { cafes, isLoading, selectedCafeId } = useCafeContext();

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-24 w-24 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cafes.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center">
        <Frown className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Cafés Found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try moving the map or changing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4 pt-0">
      {cafes.map((cafe) => (
        <div
          key={cafe.place_id}
          onClick={() => onCafeSelect(cafe.place_id)}
          className={cn(
            'cursor-pointer rounded-lg transition-all',
            selectedCafeId === cafe.place_id && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
          )}
        >
          <CafeCard cafe={cafe} />
        </div>
      ))}
    </div>
  );
}
