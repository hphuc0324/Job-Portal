import applicationApi from '@/apis/application-api';
import favoriteApi from '@/apis/favorite-api';
import JobList from '@/components/job-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuth from '@/hooks/use-auth';
import { Application, Job } from '@/types/dtos';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';

function ApplicantDashboard() {
  const [appications, setAppications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsRes, savedJobsRes] = await Promise.all([
          applicationApi.getUserApplications(auth?.user?.id || ''),
          favoriteApi.getFavoriteList(auth?.user?.id || ''),
        ]);

        setAppications(applicationsRes.data.data);
        setSavedJobs(savedJobsRes.data.data);
      } catch (error: AxiosError | any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const pendingApplications = useMemo(() => appications.filter((app) => app.status === 'pending'), [appications]);
  const scheduledApplications = useMemo(() => appications.filter((app) => app.status === 'invited'), [appications]);
  const offeredApplications = useMemo(() => appications.filter((app) => app.status === 'offered'), [appications]);
  const rejectedApplications = useMemo(() => appications.filter((app) => app.status === 'rejected'), [appications]);

  console.log(savedJobs);

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <Tabs defaultValue="applied" className="w-full">
        <TabsList className="justify-start my-8 w-full bg-transparent border-b-2 border-black rounded-none px-0">
          <TabsTrigger
            value="applied"
            className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
          >
            Applied jobs
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
          >
            Schedule
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
          <TabsTrigger
            value="saved"
            className="py-2 px-4 border-2 rounded-b-none border-transparent relative text-xl after:content-[''] after:absolute after:w-full after:h-0.5 after:-bottom-[3px] after:bg-white font-semibold aria-selected:pb-0 aria-selected:!shadow-none aria-selected:border-black aria-selected:border-b-transparent mb-[2px]"
          >
            Saved jobs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applied">
          <JobList jobs={pendingApplications.map((app) => app.job)} />

          {pendingApplications.length === 0 && <span className="font-semibold">Nothing to show yet...</span>}
        </TabsContent>
        <TabsContent value="schedule">
          <JobList jobs={scheduledApplications.map((app) => app.job)} />

          {scheduledApplications.length === 0 && <span className="font-semibold">Nothing to show yet...</span>}
        </TabsContent>
        <TabsContent value="offered">
          <JobList jobs={offeredApplications.map((app) => app.job)} />

          {offeredApplications.length === 0 && <span className="font-semibold">Nothing to show yet...</span>}
        </TabsContent>
        <TabsContent value="rejected">
          <JobList jobs={rejectedApplications.map((app) => app.job)} />

          {rejectedApplications.length === 0 && <span className="font-semibold">Nothing to show yet...</span>}
        </TabsContent>
        <TabsContent value="saved">
          <JobList jobs={savedJobs} favoriteList={savedJobs.map((job) => job.id)} />
          {savedJobs.length === 0 && <span className="font-semibold">Nothing to show yet...</span>}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ApplicantDashboard;
