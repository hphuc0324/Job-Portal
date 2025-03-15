import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Dot } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { Clock } from 'lucide-react';
import UserAvatar from './user-avatar';
import { Job } from '@/types/dtos';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  return (
    <Link to={`/job/${job.slug}`}>
      <Card className="p-4 h-[220px] hover:shadow-lg cursor-pointer">
        <div>
          <div className="flex gap-1 items-center">
            <UserAvatar />
            <div className="flex flex-col justify-between flex-1">
              <h3 className="font-bold">{job.title}</h3>
              <span className="flex font-semibold text-sm items-center">
                Google <Dot className="w-4 h-4" /> {job.location}
              </span>
            </div>
            <button>
              <Bookmark />
            </button>
          </div>
          <div className="flex my-2 gap-1">
            <Badge className="text-xs uppercase bg-[#eee0fc] text-[#ae83dd] hover:bg-[#eee0fc]">{job.level}</Badge>
            <Badge className="text-xs uppercase bg-[#e3fff0] text-[#7cc189] hover:bg-[#e3fff0]">{job.type}</Badge>
          </div>
        </div>
        <CardContent className="p-0">
          <p className="max-h-14 h-14 text-sm line-clamp-3 overflow-hidden text-ellipsis">{job.description}</p>
          <Separator className="my-3" />
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="font-bold">${job.salary}</span>
              <span className="font-bold text-gray-500">/hr</span>
            </div>
            <span className="flex items-center text-sm text-gray-500 font-semibold gap-1">
              <Clock className="w-3 h-4" />
              Posted 1 month ago
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default JobCard;
