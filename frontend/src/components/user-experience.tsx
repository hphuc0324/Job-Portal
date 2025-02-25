import { Dot } from 'lucide-react';
import UserAvatar from './user-avatar';
import { Experience } from '@/types/dtos';

interface UserExperienceProps {
  experience: Experience;
}

function UserExperience({ experience }: UserExperienceProps) {
  return (
    <div className="flex flex-1 gap-1">
      <UserAvatar avatarUrl={experience.company.avatarUrl} />

      <div className="flex flex-col justify-between flex-1">
        <h3 className="font-bold">{experience.role}</h3>
        <span className="flex font-semibold text-sm items-center">
          {experience.company.name} <Dot className="w-4 h-4" /> {experience.location}
        </span>
      </div>

      <span className="text-sm font-semibold">
        {new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -{' '}
        {experience.isCurrentlyWorking
          ? 'Present'
          : experience.endDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
      </span>
    </div>
  );
}

export default UserExperience;
