"use client";

import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { CoffeePin } from '../icons/coffee-pin';
import type { Cafe } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Star } from 'lucide-radix';
import { Badge } from '../ui/badge';

type CafeMarkerProps = {
  cafe: Cafe;
  isSelected: boolean;
  onClick: () => void;
};

export function CafeMarker({ cafe, isSelected, onClick }: CafeMarkerProps) {
  return (
    <>
      <AdvancedMarker position={cafe.location} onClick={onClick}>
        <CoffeePin isSelected={isSelected} />
      </AdvancedMarker>
      {isSelected && (
        <InfoWindow position={cafe.location} onCloseClick={onClick}>
          <div className="p-2">
            <h3 className="font-bold text-md">{cafe.name}</h3>
            <p className="text-sm text-muted-foreground">{cafe.vicinity}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
