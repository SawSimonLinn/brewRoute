"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Trash2, MapPin, Frown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function FavoritesSheet({ children }: { children: React.ReactNode }) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Favorite Cafés</SheetTitle>
          <SheetDescription>
            A list of cafés you've saved for later.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 h-full overflow-y-auto">
          {favorites.length > 0 ? (
            <div className="space-y-4">
              {favorites.map((fav) => (
                <Card key={fav.place_id} className="relative group">
                  <CardHeader>
                    <CardTitle className="text-md pr-10">{fav.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {fav.vicinity}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-muted-foreground opacity-50 group-hover:opacity-100"
                      onClick={() => removeFavorite(fav.place_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <div className="flex h-full flex-col items-center justify-center text-center">
                <Frown className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Favorites Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                Click the star on a café to save it.
                </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
