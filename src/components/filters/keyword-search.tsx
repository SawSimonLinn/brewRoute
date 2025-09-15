"use client";

import { useCafeContext } from '@/context/cafe-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { FormEvent } from 'react';

type KeywordSearchProps = {
  onSearch: () => void;
}

export function KeywordSearch({ onSearch }: KeywordSearchProps) {
  const { keyword, setKeyword } = useCafeContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by keyword (e.g. latte, quiet)..."
        className="w-full pl-10"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
}
