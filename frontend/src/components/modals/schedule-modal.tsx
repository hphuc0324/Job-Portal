import { Application } from '@/types/dtos';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimePickerDemo } from '../time-picker';
import { format } from 'date-fns';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ScheduleModalProps {
  application: Application;
  onApplicationUpdate: (applicationId: string, data: any) => void;
}

function ScheduleModal({ application, onApplicationUpdate }: ScheduleModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(application.schedule || new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);

    setPopoverOpen(true);
  };

  const handleSchedule = async () => {
    try {
      setIsLoading(true);

      await onApplicationUpdate(application.id, {
        schedule: date,
        status: 'invited',
      });
      setOpen(false);
      setPopoverOpen(false);
    } catch (error: AxiosError | any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="text-[#FFD149]">
          <CalendarIcon />
          Schedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Schedule an interview</DialogTitle>

        <span className="text-sm font-semibold">Date</span>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={true}>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('justify-start text-left font-normal w-full', !date && 'text-muted-foreground')}
            >
              <CalendarIcon />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div onClick={(e) => e.stopPropagation()}>
              <Calendar
                disabled={(date) => date < new Date()}
                mode="single"
                selected={date}
                onSelect={handleDateChange}
              />
            </div>
          </PopoverContent>
        </Popover>

        <span className="text-sm font-semibold">Time</span>
        <TimePickerDemo date={date} setDate={setDate} />

        <Button disabled={isLoading} onClick={handleSchedule}>
          {isLoading && <Loader2 className="animate-spin" />}
          Schedule
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleModal;
