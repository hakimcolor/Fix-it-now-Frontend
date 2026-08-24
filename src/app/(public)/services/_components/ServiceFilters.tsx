'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RotateCcw, SlidersHorizontal, Tags, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IServiceCategory {
  id: string;
  name: string;
}

export default function ServiceFilter({
  categories,
}: {
  categories: IServiceCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getValue = (key: string) => searchParams.get(key) ?? '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Always reset to page 1 when filter changes
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTextInput = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => router.push(pathname);

  const hasActiveFilters = ['categoryId', 'searchTerm', 'minRating'].some((k) =>
    searchParams.has(k)
  );

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="border-b bg-muted/30 px-5 py-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="h-4 w-4" />
          Filter Services
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <div className="flex flex-col gap-5">
          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Tags className="h-4 w-4 text-muted-foreground" />
              Category
            </label>
            <Select
              value={getValue('categoryId') || 'all'}
              onValueChange={(v) => updateFilter('categoryId', v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Min Rating */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Star className="h-4 w-4 text-muted-foreground" />
              Minimum Rating
            </label>
            <Select
              value={getValue('minRating') || 'all'}
              onValueChange={(v) => updateFilter('minRating', v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                {[1, 2, 3, 4, 5].map((r) => (
                  <SelectItem key={r} value={String(r)}>
                    {r}+ Stars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search term shortcut */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Keyword</label>
            <Input
              key={getValue('searchTerm')}
              defaultValue={getValue('searchTerm')}
              placeholder="e.g. electrical repair"
              onBlur={(e) => handleTextInput('searchTerm', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter')
                  handleTextInput('searchTerm', e.currentTarget.value);
              }}
            />
          </div>

          {/* Reset */}
          <div className="border-t pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
