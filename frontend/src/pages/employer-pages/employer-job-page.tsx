import jobApi from '@/apis/job-api';
import JobDetailsComponent from '@/components/job-details-component';
import { Application, Job } from '@/types/dtos';
import { useEffect, useState, useMemo } from 'react';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import applicationApi from '@/apis/application-api';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
import TalentCard from '@/components/talent-card';
import TalentList from '@/components/talent-list';

function EmployerJobPage() {
  const { slug } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const { toast } = useToast();
  const { setJobs } = useOutletContext<{
    setJobs: (jobs: Job[] | ((prevJobs: Job[]) => Job[])) => void;
    jobs: Job[];
  }>();

  if (!slug) {
    return <Navigate to="/dashboard/employer" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobResponse, applicationsResponse] = await Promise.all([
          jobApi.getJobDetails(slug),
          applicationApi.getJobApplications(slug),
        ]);

        setJob(jobResponse.data.data);
        setApplications(applicationsResponse.data.data);
      } catch (error) {}
    };
    fetchData();
  }, [slug]);

  const handleUpdateJobStatus = async (status: 'active' | 'draft' | 'closed') => {
    try {
      const res = await jobApi.updateJob(slug, {
        status: status,
      });

      const updatedJob: Job = res.data.data;

      // Update the current job in state
      setJob(updatedJob);

      // Use updater function form to update jobs list
      setJobs((prevJobs: Job[]) => prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));

      toast({
        title: 'Success',
        description: `Job status updated to ${status}`,
      });
    } catch (error: AxiosError | any) {
      console.log(error);
    }
  };

  const pendingApplications = useMemo(
    () => applications.filter((application) => application.status === 'pending'),
    [applications],
  );
  const invitedApplications = useMemo(
    () => applications.filter((application) => application.status === 'invited'),
    [applications],
  );
  const offeredApplications = useMemo(
    () => applications.filter((application) => application.status === 'offered'),
    [applications],
  );
  const rejectedApplications = useMemo(
    () => applications.filter((application) => application.status === 'rejected'),
    [applications],
  );

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="justify-start my-8 w-full bg-transparent border-b-2 border-black rounded-none px-0">
        <TabsTrigger
          value="overview"
          className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="applicants"
          className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
        >
          Applicants
        </TabsTrigger>
        <TabsTrigger
          value="invited"
          className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
        >
          Invited
        </TabsTrigger>
        <TabsTrigger
          value="offered"
          className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
        >
          Offered
        </TabsTrigger>
        <TabsTrigger
          value="rejected"
          className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
        >
          Rejected
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        {job && <JobDetailsComponent job={job} viewingType="employer" onStatusChange={handleUpdateJobStatus} />}
      </TabsContent>
      <TabsContent value="applicants">
        {pendingApplications.map((application) => (
          <TalentCard key={application.id} user={application.user} status="pending" />
        ))}
        {pendingApplications.length === 0 && <span className="block w-full text-center">No applications yet</span>}
      </TabsContent>
      <TabsContent value="invited">
        {invitedApplications.map((application) => (
          <TalentCard key={application.id} user={application.user} status="invited" />
        ))}
        {invitedApplications.length === 0 && (
          <span className="block w-full text-center">No invited applicants yet</span>
        )}
      </TabsContent>
      <TabsContent value="offered">
        {offeredApplications.map((application) => (
          <TalentCard key={application.id} user={application.user} status="offered" />
        ))}
        {offeredApplications.length === 0 && (
          <span className="block w-full text-center">No offered applicants yet</span>
        )}
      </TabsContent>
      <TabsContent value="rejected">
        {rejectedApplications.map((application) => (
          <TalentCard key={application.id} user={application.user} status="rejected" />
        ))}
        {rejectedApplications.length === 0 && (
          <span className="block w-full text-center">No rejected applicants yet</span>
        )}
      </TabsContent>
    </Tabs>
  );
}

export default EmployerJobPage;
