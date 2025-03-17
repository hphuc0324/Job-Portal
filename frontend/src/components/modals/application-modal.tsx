import { Application } from '@/types/dtos';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';

interface ApplicationModalProps {
  application: Application;
}

function ApplicationModal({ application }: ApplicationModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-full my-3 bg-[#FFD149] text-black hover:bg-[#FFD149]/80"
          onClick={() => setOpen(true)}
        >
          View application
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Application</DialogTitle>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Email: </span> <span>{application.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Phone number: </span>
            <span>{application.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Resume: </span>
            <a href={application.resume} target="_blank" className="text-blue-500 hover:underline">
              {application.user.name}
            </a>
          </div>
          <div className="font-semibold">Cover letter: </div> <span>{application.coverLetter}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ApplicationModal;
