'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export default function ServicesSearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      // Preserve all existing params (category, city, etc.)
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('searchTerm', value);
      } else {
        params.delete('searchTerm');
      }
      // Reset to page 1 on new search
      params.delete('page');

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        defaultValue={searchParams.get('searchTerm') ?? ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search services..."
        className="pl-9"
      />
    </div>
  );
}
