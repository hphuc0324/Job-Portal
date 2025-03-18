import { Job } from '@/types/dtos';
import JobCard from './job-card';
import { cn } from '@/lib/utils';

interface JobListProps {
  jobs: Job[];
  jobPerLine?: number;
  favoriteList?: string[];
  toggleFavorite?: (jobId: string) => void;
}

function JobList({ jobs, jobPerLine, favoriteList, toggleFavorite }: JobListProps) {
  return (
    <div
      className={cn(
        !jobPerLine && 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
        jobPerLine && `grid grid-cols-${jobPerLine} gap-4`,
      )}
    >
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} isFavorite={favoriteList?.includes(job.id)} toggleFavorite={toggleFavorite} />
      ))}
    </div>
  );
}

export default JobList;
