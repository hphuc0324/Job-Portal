import useAuth from '@/hooks/use-auth';
import { Link, useLocation } from 'react-router-dom';
import { Separator } from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import UserAvatar from './user-avatar';
import { Bell } from 'lucide-react';
import Notification from './notification';

function DesktopBar() {
  const auth = useAuth();
  const path = useLocation().pathname;

  const isAuthenticated = auth?.user;

  return (
    <div>
      <div className="w-full h-20 bg-black flex items-center justify-between">
        <div className="p-4">
          <Link className="text-white font-semibold text-xl" to="/">
            JobPortal
          </Link>
        </div>

        <div className="h-full flex text-white gap-4 items-center relative">
          <div
            className={cn(
              'h-full px-3 flex items-center',
              path.includes('/search/jobs') && 'border-b-2 border-solid border-white ',
            )}
          >
            <Link to="/search/jobs">Find jobs</Link>
          </div>
          <div
            className={cn(
              'h-full px-3 flex items-center',
              path.includes('/search/talents') && 'border-b-2 border-solid border-white ',
            )}
          >
            <Link to="/search/talents">Find talents</Link>
          </div>
          <div
            className={cn(
              'h-full px-3 flex items-center',
              path.includes('/post-job') && 'border-b-2 border-solid border-white ',
            )}
          >
            <Link to="/post-job">Post job</Link>
          </div>
          <div
            className={cn(
              'h-full px-3 flex items-center',
              path.includes('/about') && 'border-b-2 border-solid border-white ',
            )}
          >
            <Link to="/about">About us</Link>
          </div>
        </div>

        {isAuthenticated && (
          <div className="w-32 flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                {/* <UserAvatar size="tiny" type="applicant" avatarUrl="https://github.com/shadcn.png" /> */}
                <button>
                  <UserAvatar size="tiny" type="applicant" avatarUrl="https://github.com/shadcn.png" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="px-0 py-1 w-48">
                <div className="cursor-pointer text-md rounded-sm hover:bg-[#ececec] p-2">Profile</div>

                <Separator className="h-[1px] bg-[rgba(0,0,0,0.1)] my-2" />
                <div className="cursor-pointer text-md rounded-sm hover:bg-[#ececec] p-2">Log out</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className="w-10 h-10 p-2 rounded-full text-center text-white border-solid border-[1px] border-white">
                  <Bell />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="px-2 py-1 w-72">
                <Notification
                  image="https://github.com/shadcn.png"
                  content="Some notification for you sssssss ahifdaisd adih[ daosasss  adhi asidh"
                  time={new Date()}
                />

                <Notification
                  type="success"
                  content="Some notification for you sssssss ahifdaisd adih[ daosasss  adhi asidh"
                  time={new Date()}
                />

                <Notification
                  type="warning"
                  content="Some notification for you sssssss ahifdaisd adih[ daosasss  adhi asidh"
                  time={new Date()}
                />

                <Notification
                  type="error"
                  content="Some notification for you sssssss ahifdaisd adih[ daosasss  adhi asidh"
                  time={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex gap-3 px-8">
            <Link className="py-3 px-5 rounded-md bg-[#c3ee8d] text-sm font-semibold" to="/auth/login">
              Sign in
            </Link>
            <Link className="py-3 px-5 rounded-md bg-[#fea64a] text-sm font-semibold" to="/auth/register">
              Register
            </Link>
          </div>
        )}
      </div>
      <Separator className="h-[0.5px] bg-[#818080]" />
    </div>
  );
}

export default DesktopBar;
