"use client";

import { Button } from "@/components/ui/button";
import { FavoritesSheet } from "@/components/favorites/favorites-sheet";
import { Coffee, Star } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="BrewRoute Logo" width={32} height={32} />
        <h1 className="text-xl font-bold tracking-tight text-foreground font-headline">
          BrewRoute
        </h1>
      </div>
      <FavoritesSheet>
        <Button variant="ghost" size="icon">
          <Star className="h-5 w-5" />
          <span className="sr-only">My Favorites</span>
        </Button>
      </FavoritesSheet>
    </header>
  );
}
