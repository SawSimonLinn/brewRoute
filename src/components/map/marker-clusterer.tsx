"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer as GoogleMarkerClusterer } from '@googlemaps/markerclusterer';

type MarkerClustererProps = {
  children: ReactNode;
};

export const MarkerClusterer = ({ children }: MarkerClustererProps) => {
  const map = useMap();
  const clusterer = useRef<GoogleMarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!clusterer.current) {
      clusterer.current = new GoogleMarkerClusterer({ map });
    }

    // This is a bit of a hack to get the markers from the children
    const markers = (children as any[])
      .filter((child) => child.type.name === 'AdvancedMarker')
      .map((child) => child.props.gmpDraggable);

    clusterer.current.clearMarkers();
    clusterer.current.addMarkers(markers);
    
  }, [map, children]);

  return <>{children}</>;
};
