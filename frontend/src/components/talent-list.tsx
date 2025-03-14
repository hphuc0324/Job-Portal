import { User } from '@/types/dtos';
import TalentCard from './talent-card';
import { cn } from '@/lib/utils';

interface TalentListProps {
  talents: User[];
  talentsPerLine?: number;
}

function TalentList({ talents, talentsPerLine }: TalentListProps) {
  const col = talentsPerLine ? 12 / talentsPerLine : undefined;

  return (
    <div
      className={cn(
        !col && 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
        col && `sm:grid-cols-${col} gap-4 space-y-4`,
      )}
    >
      {talents.map((talent, index) => (
        <TalentCard key={index} user={talent} />
      ))}
    </div>
  );
}

export default TalentList;
