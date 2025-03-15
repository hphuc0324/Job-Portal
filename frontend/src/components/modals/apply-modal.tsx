import { Job } from '@/types/dtos';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import UserAvatar from '../user-avatar';
import { Separator } from '../ui/separator';
import useAuth from '@/hooks/use-auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ApplyForm from '../forms/apply-form';
import { ApplyFormSchemaType } from '@/types/schemas/apply';
import { AxiosError } from 'axios';
import applicationApi from '@/apis/application-api';
import { useToast } from '@/hooks/use-toast';

interface ApplyModalProps {
  job: Job;
}

function ApplyModal({ job }: ApplyModalProps) {
  const auth = useAuth();
  const pathname = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !auth?.user) {
      const url = encodeURIComponent(pathname);

      navigate(`/auth/login?redirect=${url}`);
    }
    setOpen(isOpen);
  };

  const handleSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);
      const res = await applicationApi.createApplication(values);

      toast({
        title: 'Success',
        description: 'Application submitted successfully',
      });

      //navigate to list of applications
    } catch (error: AxiosError | any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-24 h-12">Apply</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70%]">
        <DialogTitle></DialogTitle>
        <DialogHeader>
          <div className="flex gap-2">
            <UserAvatar size="medium" type="employer" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg">{job.title}</span>
              <span>{job.company.name}</span>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-2" />

        <div>
          <span className="font-semibold text-2xl">Submit your application</span>
          {auth?.user && <ApplyForm isLoading={isLoading} user={auth?.user} job={job} onSubmit={handleSubmit} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ApplyModal;
