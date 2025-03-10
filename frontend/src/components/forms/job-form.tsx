import { Category, Job, Level } from '@/types/dtos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import InputField from '../form-input/input-field';
import Editor from '../richtext-editor/editor';
import { Button } from '../ui/button';
import SelectField from '../form-input/select-field';

const UserSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  experience: z.string(),
  avatarUrl: z.string(),
  role: z.string().nonempty(),
});

const JobFormSchema = z.object({
  title: z.string().nonempty('Title must not be empty'),
  location: z.string().nonempty('Location must not be empty'),
  level: z.string().nonempty('Level must not be empty'),
  category: z.string().nonempty('Category must not be empty'),
  description: z.string().nonempty('Description must not be empty'),
  salary: z.coerce.number().min(1, 'Salary must be greater than 0'),
  type: z.string(),
  responsibility: z.string(),
  requirements: z.string(),
});

export type JobFormSchemaType = z.infer<typeof JobFormSchema>;

interface JobFormProps {
  job?: Job;
  onSubmit: (value: JobFormSchemaType, type: string) => void;
  levels?: Level[];
  categories?: Category[];
}

export enum JobTypes {
  FULLTIME = 'fulltime',
  PARTTIME = 'parttime',
  VOLUNTEERING = 'volunteering',
}

function JobForm({ job, onSubmit, levels, categories }: JobFormProps) {
  const form = useForm<JobFormSchemaType>({
    defaultValues: job || {
      title: '',
      location: '',
      level: '',
      category: '',
      description: '{}',
      salary: 0,
      type: '',
      responsibility: '{}',
      requirements: '{}',
    },
    resolver: zodResolver(JobFormSchema),
  });

  const handleSubmit = async (type: 'save' | 'draft') => {
    form.handleSubmit((values) => onSubmit(values, type))();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values, 'save'))}>
        <div className="grid grid-cols-2 gap-4">
          <InputField control={form.control} name="title" label="Title" placeholder="Title" />
          <InputField control={form.control} name="location" label="Location" placeholder="Location" />
          <InputField control={form.control} name="salary" label="Salary" placeholder="Salary" type="number" />

          <SelectField
            form={form}
            name="type"
            label="Type"
            placeholder="Choose type"
            options={Array.from(Object.values(JobTypes)).map((type) => ({ value: type, label: type }))}
          />

          <SelectField
            form={form}
            name="category"
            label="Category"
            placeholder="Category"
            options={categories ? categories?.map((category) => ({ value: category.name, label: category.name })) : []}
          />

          <SelectField
            form={form}
            name="level"
            label="Level"
            placeholder="Level"
            options={levels ? levels?.map((level) => ({ value: level.name, label: level.name })) : []}
          />
        </div>

        <div className="my-4">
          <span className="text-sm font-semibold">Description</span>
          <Editor
            editable={true}
            value={form.watch('description')}
            onChange={(value) => form.setValue('description', value)}
          />
        </div>
        <div className="my-4">
          <span className="text-sm font-semibold">Requirements</span>
          <Editor
            editable={true}
            value={form.watch('requirements')}
            onChange={(value) => form.setValue('requirements', value)}
          />
        </div>

        <div className="my-4">
          <span className="text-sm font-semibold">Responsibility</span>
          <Editor
            editable={true}
            value={form.watch('responsibility')}
            onChange={(value) => form.setValue('responsibility', value)}
          />
        </div>

        <div className="flex gap-2">
          <Button type="button" className="text-[#FFD149]" onClick={() => handleSubmit('save')}>
            Save
          </Button>
          <Button
            type="button"
            className="bg-[#FFD149] text-black hover:bg-[#FFD149]/80"
            onClick={() => handleSubmit('draft')}
          >
            Save as draft
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default JobForm;
