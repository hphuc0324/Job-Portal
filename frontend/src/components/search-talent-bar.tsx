import { Search, Map, Zap } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useState } from 'react';
import { DualRangeSlider } from './dual-slider';
import UserFilter from '@/types/filters/user-filter';

interface SearchTalentBarProps {
  name?: string;
  location?: string;
  skills?: string[];
  minExperience?: number;
  maxExperience?: number;
  setFilters: (filter: UserFilter) => void;
}

function SearchTalentBar({ name, location, skills, minExperience, maxExperience, setFilters }: SearchTalentBarProps) {
  const [localSearch, setLocalSearch] = useState<{ name: string; location: string; skills: string[] }>({
    name: name || '',
    location: location || '',
    skills: skills || [],
  });
  const [localSkills, setLocalSkills] = useState<string>('');

  const handleAddSkill = () => {
    if (!localSkills || localSearch.skills.includes(localSkills)) return;
    setLocalSearch((prev) => ({ ...prev, skills: [...prev.skills, localSkills] }));
    setLocalSkills('');
  };

  return (
    <div className="px-8 py-8 bg-black flex">
      <div className="w-full h-16 mx-auto bg-white py-2 px-4 rounded-full flex items-center">
        <div className="flex items-center gap-2 flex-1 h-full">
          <Search />
          <input
            value={localSearch.name || ''}
            onChange={(e) => setLocalSearch((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Talent's name..."
            className="focus-visible:border-none focus-visible:outline-none"
          />

          <Separator orientation="vertical" className="h-[80%] mx-8" />
          <div className="flex items-center gap-2">
            <Map />
            <input
              value={localSearch.location || ''}
              onChange={(e) => setLocalSearch((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Location..."
              className="focus-visible:border-none focus-visible:outline-none"
            />
          </div>

          <Separator orientation="vertical" className="h-[80%] mx-8" />
          <div className="flex items-center gap-2">
            <Zap />
            <div className="flex flex-wrap gap-2 max-w-52 max-h-14 overflow-hidden overflow-y-auto">
              {localSearch.skills?.map((skill, index) => (
                <div key={index} className="flex items-center gap-1 bg-slate-500 text-white rounded-full px-2 min-w-12">
                  <span className="text-sm font-semibold">{skill}</span>
                  <button
                    onClick={() =>
                      setLocalSearch((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
                    }
                  >
                    <span>×</span>
                  </button>
                </div>
              ))}
            </div>
            <input
              value={localSkills || ''}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              onChange={(e) => setLocalSkills(e.target.value)}
              placeholder="Location..."
              className="focus-visible:border-none focus-visible:outline-none"
            />
          </div>

          <Separator orientation="vertical" className="h-[80%] mx-8" />
          <div className="w-full h-full flex-1">
            <h3 className="font-semibold text-sm mb-2">Experience(year)</h3>
            <DualRangeSlider
              className="max-w-48"
              value={[minExperience ?? 0, maxExperience ?? 5]}
              min={0}
              max={20}
              step={1}
              onValueChange={(value) => setFilters({ minExperience: value[0], maxExperience: value[1] })}
              label={(value) => <span className="text-sm absolute -top-2">{value}</span>}
              labelPosition="bottom"
            />
          </div>

          <Button variant="third" className="h-full aspect-square rounded-full" onClick={() => setFilters(localSearch)}>
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchTalentBar;
