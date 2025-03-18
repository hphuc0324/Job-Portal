import { Job, User } from '@/types/dtos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import InputField from '../form-input/input-field';
import TextArea from '../form-input/text-area';
import { Button } from '../ui/button';
import { Controller } from 'react-hook-form';
import { ApplyFormSchema, ApplyFormSchemaType } from '@/types/schemas/apply';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ApplyFormProps {
  job: Job;
  user: User;
  onSubmit: (values: FormData) => void;
  isLoading: boolean;
}

function ApplyForm({ job, user, onSubmit, isLoading }: ApplyFormProps) {
  const form = useForm<ApplyFormSchemaType>({
    defaultValues: {
      jobId: job.id,
      userId: user.id,
      name: user.name || '',
      email: user.email || '',
      phoneNumber: '',
      resume: '',
      coverLetter: '',
    },
    resolver: zodResolver(ApplyFormSchema),
  });

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleSubmit = async () => {
    const formData = new FormData();
    const applicationData = {
      email: watch('email'),
      phoneNumber: watch('phoneNumber'),
      coverLetter: watch('coverLetter'),
      jobId: watch('jobId'),
      userId: watch('userId'),
    };
    formData.append('application', new Blob([JSON.stringify(applicationData)], { type: 'application/json' }));

    if (selectedFile) {
      formData.append('resume', selectedFile);
    }
    await onSubmit(formData);
  };

  const { watch, register } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-4">
          <InputField control={form.control} name="name" placeholder="Fullname" label="Name" />
          <InputField control={form.control} name="email" placeholder="Email address" label="Email" />
          <InputField control={form.control} name="phoneNumber" placeholder="Phone number" label="Phone number" />
          <div className="flex flex-col font-semibold text-sm mb-2">
            <label htmlFor="resume" className="my-2">
              Resume
            </label>
            <Controller
              control={form.control}
              {...register('resume')}
              render={({ field: { onChange, ...field } }) => (
                <input
                  type="file"
                  {...field}
                  accept=".pdf"
                  onChange={(event) => {
                    const file = event.target?.files?.[0];

                    if (file) {
                      setSelectedFile(file);
                    }
                    onChange(event);
                  }}
                />
              )}
            />
          </div>
        </div>

        <TextArea control={form.control} name="coverLetter" placeholder="Cover letter" label="Cover letter" />
        <Button className="mt-4" disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ApplyForm;
