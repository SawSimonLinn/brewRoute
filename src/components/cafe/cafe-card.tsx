"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Cafe } from '@/lib/types';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

type CafeCardProps = {
  cafe: Cafe;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating) ? 'text-accent fill-accent' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
}

export function CafeCard({ cafe }: CafeCardProps) {
  const { toggleFavorite } = useFavorites();

  const getPhotoUrl = () => {
    if (cafe.photos && cafe.photos.length > 0) {
        // This is a simplified approach. For production, you'd want to handle dimensions etc.
        return cafe.photos[0].getUrl({maxWidth: 400, maxHeight: 400});
    }
    return `https://picsum.photos/seed/${cafe.place_id}/400/400`;
  }
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name)}&query_place_id=${cafe.place_id}`;

  return (
    <Card className="w-full overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex">
        <div className="w-1/3">
             <Image 
                src={getPhotoUrl()} 
                alt={cafe.name} 
                width={150} 
                height={150} 
                className="object-cover h-full w-full"
                data-ai-hint="cafe interior"
                />
        </div>
        <div className="w-2/3">
            <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-bold leading-tight line-clamp-2">{cafe.name}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(cafe);
                        }}
                    >
                        <Star className={`h-5 w-5 ${cafe.isFavorite ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {cafe.rating && (
                        <>
                        <StarRating rating={cafe.rating} />
                        <span className="font-medium">{cafe.rating.toFixed(1)}</span>
                        <span>({cafe.user_ratings_total})</span>
                        </>
                    )}
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="truncate">{cafe.vicinity}</span>
                </p>
                <div className="mt-2 flex items-center justify-end">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                            Open in Map
                            <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                    </a>
                </div>
            </CardContent>
        </div>
      </div>
    </Card>
  );
}
