import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  size?: 'large' | 'medium' | 'small';
  avatarUrl?: string;
  type?: string | 'applicant' | 'employer';
}

function UserAvatar({
  size = 'small',
  type = 'applicant',
  avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKEQr0n-TZPvjOShn6M_ud5JW7LRWNBHRF2A&s',
}: UserAvatarProps) {
  return (
    <div>
      {type === 'employer' ? (
        <img
          className={cn(
            'object-cover bg-[#464646] rounded-md flex-grow-0',
            size === 'small' && 'w-10 h-10 p-1',
            size === 'medium' && 'w-16 h-16 p-1',
            size === 'large' && 'w-32 h-32 p-2 rounded-2xl',
          )}
          src={avatarUrl}
        />
      ) : (
        <Avatar
          className={cn(
            size === 'large' && ' w-36 h-36 border-solid border-[6px] border-white',
            size === 'medium' && 'w-20 h-20 border-solid border-[3px] border-white',
            size === 'small' && 'w-12 h-12 border-solid border-[1px] border-white',
          )}
        >
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>avatar</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default UserAvatar;
