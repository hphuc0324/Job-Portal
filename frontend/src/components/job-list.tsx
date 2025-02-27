import { Job } from '@/types/dtos';
import JobCard from './job-card';
import { cn } from '@/lib/utils';

interface JobListProps {
  jobs: Job[];
  jobPerLine?: number;
}

function JobList({ jobs, jobPerLine }: JobListProps) {
  const col = jobPerLine ? 12 / jobPerLine : undefined;

  return (
    <div
      className={cn(
        !col && 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
        col && `sm:grid-cols-${col} gap-4 space-y-4`,
      )}
    >
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
}

export default JobList;
