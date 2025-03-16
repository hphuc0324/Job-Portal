import useAuth from '@/hooks/use-auth';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Job } from '@/types/dtos';
import { AxiosError } from 'axios';
import jobApi from '@/apis/job-api';

function EmployerDashboardLayout() {
  const [status, setStatus] = useState<'active' | 'draft' | 'closed'>('active');
  const [jobs, setJobs] = useState<Job[]>([]);
  const auth = useAuth();
  const pathname = useLocation().pathname;

  useEffect(() => {
    const handleFetchJobs = async () => {
      try {
        const res = await jobApi.getCompanyJobs(auth?.user?.id as string);

        setJobs(res.data.data);
      } catch (error: AxiosError | any) {
        console.log(error);
      }
    };

    if (auth?.user?.id) {
      handleFetchJobs();
    }
  }, [auth?.user?.id]);

  const isSelectedJob = (slug: string) => {
    return pathname.split('/dashboard/employer/')[1] === slug;
  };

  return (
    <div className="flex max-w-screen-xl mx-auto p-4 gap-8">
      <div className="w-[400px]">
        <span className="text-2xl font-semibold">Posted jobs</span>
        <div className="flex flex-wrap gap-2 my-3">
          <Button
            type="button"
            className={cn('text-[#FFD149]', status === 'active' && 'bg-[#FFD149] text-black hover:bg-[#FFD149]/80')}
            onClick={() => setStatus('active')}
          >
            Active {`[${jobs.filter((job) => job.status === 'active').length}]`}
          </Button>
          <Button
            type="button"
            className={cn('text-[#FFD149]', status === 'draft' && 'bg-[#FFD149] text-black hover:bg-[#FFD149]/80')}
            onClick={() => setStatus('draft')}
          >
            Drafts {`[${jobs.filter((job) => job.status === 'draft').length}]`}
          </Button>
          <Button
            className={cn('text-[#FFD149]', status === 'closed' && 'bg-[#FFD149] text-black hover:bg-[#FFD149]/80')}
            onClick={() => setStatus('closed')}
          >
            Closed {`[${jobs.filter((job) => job.status === 'closed').length}]`}
          </Button>
        </div>

        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
          {jobs
            .filter((job) => job.status === status)
            .map((job, index) => (
              <Link to={`/dashboard/employer/${job.slug}`} key={index}>
                <Card className={cn(isSelectedJob(job.slug) && 'border-2 border-black')}>
                  <CardHeader className="py-3 ">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                  </CardHeader>
                  <CardContent className="flex flex-col">
                    <span>{job.location}</span>
                    <span>Posted 10 minutes ago</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
      <Outlet context={{ setJobs }} />
    </div>
  );
}

export default EmployerDashboardLayout;
