import { Job } from '@/types/dtos';
import ApplyModal from '@/components/modals/apply-modal';
import Editor from '@/components/richtext-editor/editor';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/user-avatar';
import { Dot, MapPin, BriefcaseBusiness, CircleDollarSign, Clock, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobDetailsComponentProps {
  job: Job;
  viewingType?: 'applicant' | 'employer';
  onStatusChange?: (status: 'active' | 'draft' | 'closed') => void;
}

function JobDetailsComponent({ job, viewingType = 'applicant', onStatusChange }: JobDetailsComponentProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <UserAvatar size="medium" type="employer" avatarUrl={job.company.avatarUrl} />
        <div className="space-y-1 flex-1">
          <p className="font-bold text-xl">{job.title}</p>
          <div className="flex">
            <span className="block">{job.company.name}</span>
            <Dot />
            <span className="block">{job.location}</span>
          </div>
        </div>

        {viewingType === 'applicant' && (
          <div className="flex gap-3">
            <ApplyModal job={job} />
            <Button className="w-12 h-12" variant="outline">
              <Bookmark className="h-8 w-8" />
            </Button>
          </div>
        )}

        {viewingType === 'employer' && (
          <div className="flex flex-col gap-2">
            <Button size="lg">Edit</Button>
            {job.status === 'active' && (
              <Button
                onClick={onStatusChange ? () => onStatusChange('closed') : () => {}}
                variant="destructive"
                size="lg"
              >
                Close
              </Button>
            )}

            {job.status === 'closed' && (
              <Button onClick={onStatusChange ? () => onStatusChange('active') : () => {}} size="lg" variant="info">
                Reopen
              </Button>
            )}

            {job.status === 'draft' && (
              <Button onClick={onStatusChange ? () => onStatusChange('active') : () => {}} size="lg" variant="third">
                Active
              </Button>
            )}
          </div>
        )}
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
        <Editor value={job.responsibility} />
      </div>

      <div className="my-8">
        <h2 className="font-bold text-[24px] my-1">Quality and Skill sets</h2>
        <Editor value={job.requirement} />
      </div>

      {viewingType === 'applicant' && (
        <div>
          <Separator className="w-full my-8" />
          <h2 className="font-bold text-[24px] my-1">About the Company</h2>
          <div className="flex gap-2 items-center w-full">
            <UserAvatar size="small" type="employer" avatarUrl={job.company.avatarUrl} />
            <div className="flex-1">
              <p className="font-semibold text-[18px]">{job.company.name}</p>
              <p className="text-xs font-semibold text-gray-500">{job.company.location}</p>
            </div>
            <Link className="p-2 font-semibold bg-yellow-500 rounded-md text-white" to={`/profile/${job.company.id}`}>
              Company page
            </Link>
          </div>
          <p className="my-4">{job.company.description}</p>
        </div>
      )}
    </div>
  );
}

export default JobDetailsComponent;
