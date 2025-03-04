import useJobFilters from '@/hooks/use-job-filters';
import { Search, MapPin, Map } from 'lucide-react';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import JobFilter from '@/types/filters/job-filter';
import { useState } from 'react';

interface SearchJobBarProps {
  title?: string;
  location?: string;
  setFilters: (filter: JobFilter) => void;
}

function SearchJobBar({ title, location, setFilters }: SearchJobBarProps) {
  const [localSearch, setLocalSearch] = useState<{
    title: string;
    location: string;
  }>({
    title: title || '',
    location: location || '',
  });

  return (
    <div className="px-8 py-8 bg-black flex">
      <div className="w-[80%] h-16 mx-auto bg-white py-2 px-4 rounded-full flex items-center">
        <div className="flex items-center gap-2 flex-1">
          <Search />
          <input
            value={localSearch.title || ''}
            onChange={(e) => setLocalSearch((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Job title..."
            className="focus-visible:border-none focus-visible:outline-none"
          />
        </div>

        <Separator orientation="vertical" className="h-[80%] mx-10" />
        <div className="flex flex-1 items-center gap-2">
          <Map />
          <input
            value={localSearch.location || ''}
            onChange={(e) => setLocalSearch((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="Location..."
            className="focus-visible:border-none focus-visible:outline-none"
          />
        </div>

        <Button variant="third" className="h-full rounded-full min-w-36" onClick={() => setFilters(localSearch)}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchJobBar;
