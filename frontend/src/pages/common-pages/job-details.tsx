import JobList from '@/components/job-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/user-avatar';
import { Job } from '@/types/dtos';
import { Roles } from '@/types/schemas/register';
import { Dot, MapPin, BriefcaseBusiness, CircleDollarSign, Clock, Bookmark, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const job: Job = {
  title: 'Developer',
  location: 'Vietnam',
  slug: 'google-developer',
  type: 'fulltime',
  salary: 50,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non consectetur justo. Duis consectetur, velit non scelerisque tristique, justo nisi laoreet justo, at consectetur risus nunc in velit. Donec sagittis libero non justo dictum, at scelerisque enim commodo. Sed non velit auctor, bibendum neque non, maximus neque.',
  status: 'active',
  level: 'intern',
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
  return (
    <div className="w-screen max-w-screen-xl mx-auto p-8 flex gap-8">
      <div className="w-full max-w-[70%]">
        <div className="flex items-center gap-2">
          <UserAvatar size="medium" type="employer" />
          <div className="space-y-1 flex-1">
            <p className="font-bold text-xl">{job.title}</p>
            <div className="flex">
              <span className="block">{job.company.name}</span>
              <Dot />
              <span className="block">{job.location}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="w-24 h-12" variant="third">
              Apply
            </Button>
            <Button className="w-12 h-12" variant="outline">
              <Bookmark className="h-8 w-8" />
            </Button>
          </div>
        </div>

        <Separator className="w-full my-8" />

        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 p-2 rounded-full bg-third text-white">
              <MapPin className="w-8 h-8" />
            </div>
            <span className="block text-gray-400">Location</span>
            <span className="text-[18px]">{job.location}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 p-2 rounded-full bg-third text-white">
              <BriefcaseBusiness className="w-8 h-8" />
            </div>
            <span className="block text-gray-400">Level</span>
            <span className="text-[18px] capitalize">{job.level}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 p-2 rounded-full bg-third text-white">
              <CircleDollarSign className="w-8 h-8" />
            </div>
            <span className="block text-gray-400">Salary</span>
            <span className="text-[18px] capitalize">${job.salary}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 p-2 rounded-full bg-third text-white">
              <Clock className="w-8 h-8" />
            </div>
            <span className="block text-gray-400">Type</span>
            <span className="text-[18px] capitalize">{job.type}</span>
          </div>
        </div>

        <Separator className="w-full my-8" />

        <div className="my-8">
          <h2 className="font-bold text-[24px] my-1">About the job</h2>
          <p>{job.description}</p>
        </div>

        <div className="my-8">
          <h2 className="font-bold text-[24px] my-1">Responsibility</h2>
          <p>{job.description}</p>
        </div>

        <div className="my-8">
          <h2 className="font-bold text-[24px] my-1">Quality and Skill sets</h2>
          <p>{job.description}</p>
        </div>

        <Separator className="w-full my-8" />

        <h2 className="font-bold text-[24px] my-1">About the Company</h2>
        <div className="flex gap-2 items-center w-full">
          <UserAvatar size="small" type="employer" />
          <div className="flex-1">
            <p className="font-semibold text-[18px]">{job.company.name}</p>
            <p className="text-xs font-semibold text-gray-500">{job.company.location}</p>
          </div>
          <Link className="p-2 font-semibold bg-yellow-500 rounded-md text-white" to={job.company.id}>
            Company page
          </Link>
        </div>
        <p className="my-4">{job.company.description}</p>
      </div>

      <div className="max-w-[30%]">
        <h2 className="font-bold text-[24px] mb-8">Recommended jobs</h2>
        <JobList jobs={[job, job, job, job]} jobPerLine={1} />
      </div>
    </div>
  );
}

export default JobDetailsPage;
