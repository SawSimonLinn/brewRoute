"use client";

import { Map, useMap } from '@vis.gl/react-google-maps';
import { CafeMarker } from './cafe-marker';
import { useCafeContext } from '@/context/cafe-context';
import { useEffect } from 'react';
import { MarkerClusterer } from './marker-clusterer';

type MapViewProps = {
  center: google.maps.LatLngLiteral;
  onMapLoad: (map: google.maps.Map) => void;
  onMapIdle: () => void;
};

function MapEvents({ onMapLoad, onMapIdle }: Pick<MapViewProps, 'onMapLoad' | 'onMapIdle'>) {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      onMapLoad(map);
      const idleListener = map.addListener('idle', onMapIdle);
      return () => {
        google.maps.event.removeListener(idleListener);
      };
    }
  }, [map, onMapLoad, onMapIdle]);

  return null;
}

export function MapView({ center, onMapLoad, onMapIdle }: MapViewProps) {
  const { cafes, selectedCafeId, setSelectedCafeId } = useCafeContext();

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Map
        defaultCenter={center}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'a3b5a7e6b0f1a2b3'}
        styles={[
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
        ]}
      >
        <MapEvents onMapLoad={onMapLoad} onMapIdle={onMapIdle} />
        <MarkerClusterer>
          {cafes.map((cafe) => (
            <CafeMarker
              key={cafe.place_id}
              cafe={cafe}
              isSelected={selectedCafeId === cafe.place_id}
              onClick={() => setSelectedCafeId(cafe.place_id)}
            />
          ))}
        </MarkerClusterer>
      </Map>
    </div>
  );
}
