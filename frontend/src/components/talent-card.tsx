import { Application, User } from '@/types/dtos';
import { Card, CardContent } from './ui/card';
import UserAvatar from './user-avatar';
import { CalendarIcon, MapPin } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import ApplicationModal from './modals/application-modal';
import ScheduleModal from './modals/schedule-modal';

interface TalentCardProps {
  user: User;
  status?: 'pending' | 'invited' | 'offered' | 'rejected';
  application?: Application;
  onApplicationUpdate?: (applicationId: string, data: any) => void;
}

function TalentCard({ user, status, application, onApplicationUpdate }: TalentCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="p-4 max-h-96 hover:shadow-lg cursor-pointer max-w-[400px]">
      <div>
        <div className="flex gap-1 items-center">
          <UserAvatar avatarUrl={user.avatarUrl} />
          <div className="flex flex-col justify-between flex-1">
            <h3 className="font-bold">{user.name}</h3>
            <span className="flex font-semibold text-sm items-center">{user.job}</span>
          </div>
        </div>
        {!status && (
          <div className="flex flex-wrap my-2 gap-1">
            {user.skills?.split(',').map((skill, index) => (
              <Badge key={index} className="text-xs uppercase bg-[#eee0fc] text-[#ae83dd] hover:bg-[#eee0fc]">
                {skill.trim()}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-0">
        <p className="my-2 overflow-hidden text-ellipsis line-clamp-2">{user.description}</p>

        <Separator className="my-2" />

        {status !== 'invited' && (
          <div className="flex justify-between items-center">
            <span className="font-semibold">Experience: {user.experience} years</span>

            <div className="flex items-center text-gray-500 my-2">
              <MapPin />
              <span className="text-sm">{user.location}</span>
            </div>
          </div>
        )}

        {status === 'invited' && application?.schedule && (
          <span className="flex py-2 gap-2">
            <CalendarIcon /> Schedule: {new Date(application?.schedule).toLocaleString()}
          </span>
        )}

        <Separator className="my-2" />

        <div className="flex gap-2 w-full my-4">
          <Button type="button" className="flex-1 text-[#FFD149]" onClick={() => navigate(`/profile/${user.id}`)}>
            Profile
          </Button>

          {status && status === 'invited' && (
            <Button
              type="button"
              className="flex-1 text-[#FFD149]"
              onClick={() =>
                onApplicationUpdate?.(application?.id ?? '', {
                  status: 'offered',
                })
              }
            >
              Offer
            </Button>
          )}

          {status && status !== 'offered' && status !== 'rejected' && (
            <Button
              type="button"
              className="flex-1 text-[#FFD149]"
              onClick={() =>
                onApplicationUpdate?.(application?.id ?? '', {
                  status: 'rejected',
                })
              }
            >
              Reject
            </Button>
          )}
          {(!status || status === 'offered' || status === 'rejected') && (
            <Button type="button" className="flex-1 bg-[#FFD149] text-black hover:bg-[#FFD149]/80" onClick={() => {}}>
              Message
            </Button>
          )}

          {status === 'pending' && application && (
            <ScheduleModal
              application={application}
              onApplicationUpdate={
                onApplicationUpdate
                  ? (applicationId: string, data: any) => onApplicationUpdate(applicationId, data)
                  : () => {}
              }
            />
          )}
        </div>

        {status && status !== 'offered' && status !== 'rejected' && application && (
          <ApplicationModal application={application} />
        )}
      </CardContent>
    </Card>
  );
}

export default TalentCard;
