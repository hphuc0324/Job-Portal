import CompanyAvatar from './company-avatar';
import { Dot } from 'lucide-react';

interface UserExperienceProps {
  experience: Experience;
}

export interface Experience {
  role: string;
  startDate: Date;
  endDate?: Date;
  isCurrentlyWorking: boolean;
  company: string;
  location: string;
}

function UserExperience({ experience }: UserExperienceProps) {
  return (
    <div className="flex flex-1 gap-1">
      <CompanyAvatar />

      <div className="flex flex-col justify-between flex-1">
        <h3 className="font-bold">{experience.role}</h3>
        <span className="flex font-semibold text-sm items-center">
          {experience.company} <Dot className="w-4 h-4" /> {experience.location}
        </span>
      </div>

      <span className="text-sm font-semibold">
        {experience.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -{' '}
        {experience.isCurrentlyWorking
          ? 'Present'
          : experience.endDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
      </span>
    </div>
  );
}

export default UserExperience;
