import { cn } from '@/lib/utils';

interface CompanyAvatarProps {
  size?: 'large' | 'medium' | 'small';
  avatarUrl?: string;
}

function CompanyAvatar({
  size = 'small',
  avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKEQr0n-TZPvjOShn6M_ud5JW7LRWNBHRF2A&s',
}: CompanyAvatarProps) {
  return (
    <img
      className={cn(
        'object-cover bg-[#464646] rounded-md flex-grow-0',
        size === 'small' && 'w-10 h-10 p-1',
        size === 'medium' && 'w-16 h-16 p-1',
        size === 'large' && 'w-32 h-32 p-2 rounded-2xl',
      )}
      src={avatarUrl}
    />
  );
}

export default CompanyAvatar;
