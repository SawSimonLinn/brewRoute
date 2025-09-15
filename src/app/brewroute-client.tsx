"use client";

import { useState, useEffect } from 'react';
import { CafeProvider, useCafeContext } from '@/context/cafe-context';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapView } from '@/components/map/map-view';
import { CafeList } from '@/components/cafe/cafe-list';
import { Header } from '@/components/layout/header';
import { KeywordSearch } from '@/components/filters/keyword-search';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Cafe } from '@/lib/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Map } from 'lucide-react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '@/lib/env';

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 }; // San Francisco

function BrewRouteLayout() {
  const isMobile = useIsMobile();
  const {
    map,
    setMap,
    setPlacesService,
    setIsLoading,
    setCafes,
    keyword,
    selectedCafeId,
    setSelectedCafeId,
  } = useCafeContext();
  const { isFavorite } = useFavorites();
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [mapVisible, setMapVisible] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        () => {
          // Geolocation failed
          setUserLocation(DEFAULT_CENTER);
          setIsLoading(false);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      setUserLocation(DEFAULT_CENTER);
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    if (map && window.google?.maps?.places) {
      setPlacesService(new window.google.maps.places.PlacesService(map));
    }
  }, [map, setPlacesService]);

  const searchCafes = () => {
    if (!map) return;

    const placesService = new window.google.maps.places.PlacesService(map);
    const bounds = map.getBounds();
    if (!bounds) return;

    setIsLoading(true);
    const request: google.maps.places.PlaceSearchRequest = {
      bounds,
      type: 'cafe',
      keyword: keyword || 'cafe',
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const cafeResults: Cafe[] = results.map((place) => ({
          place_id: place.place_id!,
          name: place.name!,
          location: place.geometry!.location!.toJSON(),
          vicinity: place.vicinity!,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          isFavorite: isFavorite(place.place_id!),
          photos: place.photos,
        }));
        setCafes(cafeResults);
      } else {
        setCafes([]);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (selectedCafeId) {
      //
    }
  }, [selectedCafeId]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col bg-card">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar side="left" className="w-full md:w-[400px] lg:w-[450px]" collapsible="none">
            <div className="flex h-full flex-col">
              <div className="p-4">
                <KeywordSearch onSearch={searchCafes} />
              </div>
              {isMobile && (
                <div className="flex items-center space-x-2 px-4 pb-2">
                  <Switch id="map-toggle" checked={mapVisible} onCheckedChange={setMapVisible} />
                  <Label htmlFor="map-toggle" className="flex items-center gap-2"><Map size={16}/> Show Map</Label>
                </div>
              )}
              <div className="flex-1 overflow-y-auto">
                <CafeList onCafeSelect={setSelectedCafeId} />
              </div>
            </div>
          </Sidebar>
          <SidebarInset className="relative flex-1">
             {(!isMobile || mapVisible) && (
              <MapView
                center={userLocation || DEFAULT_CENTER}
                onMapIdle={searchCafes}
                onMapLoad={(m) => setMap(m)}
              />
            )}
            {isMobile && (
              <div className="absolute left-2 top-2 z-10 md:hidden">
                <SidebarTrigger />
              </div>
            )}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function BrewRouteClient() {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="rounded-lg border bg-card p-6 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-destructive">Configuration Error</h1>
          <p className="mt-2 text-foreground">
            Google Maps API key is missing.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please set the <code className="font-mono text-primary">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> environment variable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <CafeProvider>
        <BrewRouteLayout />
      </CafeProvider>
    </APIProvider>
  );
}
