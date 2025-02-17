import { Job } from './job-card';
import JobCard from './job-card';

interface JobListProps {
  jobs: Job[];
}

function JobList({ jobs }: JobListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
}

export default JobList;
