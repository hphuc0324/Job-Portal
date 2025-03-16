import jobApi from '@/apis/job-api';
import JobDetailsComponent from '@/components/job-details-component';
import JobList from '@/components/job-list';
import ApplyModal from '@/components/modals/apply-modal';
import Editor from '@/components/richtext-editor/editor';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/user-avatar';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/types/dtos';
import { Roles } from '@/types/schemas/register';
import { AxiosError } from 'axios';
import { Dot, MapPin, BriefcaseBusiness, CircleDollarSign, Clock, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const temp: Job = {
  id: 'something',
  title: 'Developer',
  location: 'Vietnam',
  slug: 'google-developer',
  type: 'fulltime',
  salary: 50,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non consectetur justo. Duis consectetur, velit non scelerisque tristique, justo nisi laoreet justo, at consectetur risus nunc in velit. Donec sagittis libero non justo dictum, at scelerisque enim commodo. Sed non velit auctor, bibendum neque non, maximus neque.',
  status: 'active',
  responsibility: 'Something',
  requirement: 'Something',
  benefit: 'Something',
  level: 'intern',
  category: 'technology',
  experience: 1,
  company: {
    id: 'something',
    name: 'Google',
    avatarUrl: '',
    role: Roles.EMPLOYER,
    location: 'Vietnam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non consectetur justo. Duis consectetur, velit non scelerisque tristique, justo nisi laoreet justo, at consectetur risus nunc in velit. Donec sagittis libero non justo dictum, at scelerisque enim commodo. Sed non velit auctor, bibendum neque non, maximus neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non consectetur justo. Duis consectetur, velit non scelerisque tristique, justo nisi laoreet justo, at consectetur risus nunc in velit. Donec sagittis libero non justo dictum, at scelerisque enim commodo. Sed non velit auctor, bibendum neque non, maximus neque.',
  },
};

function JobDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const handleFetchJobDetails = async () => {
      if (slug) {
        try {
          const res = await jobApi.getJobDetails(slug);

          setJob(res.data.data);
        } catch (error: AxiosError | any) {
          toast({
            title: 'Error',
            description: error.response?.data.message || error.message,
            variant: 'destructive',
          });
        }
      }
    };

    handleFetchJobDetails();
  }, [slug]);

  return (
    <div className="w-screen max-w-screen-xl mx-auto p-8 flex gap-8">
      <div className="w-full max-w-[70%]">{job && <JobDetailsComponent job={job} />}</div>

      <div className="max-w-[30%]">
        <h2 className="font-bold text-[24px] mb-8">Recommended jobs</h2>
        <JobList jobs={[temp, temp, temp, temp]} jobPerLine={1} />
      </div>
    </div>
  );
}

export default JobDetailsPage;
