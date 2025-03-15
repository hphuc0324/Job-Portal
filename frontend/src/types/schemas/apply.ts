import { z } from 'zod';
import { phoneRegex } from '@/constants/regex';

export const ApplyFormSchema = z.object({
  userId: z.string().nonempty('User ID required'),
  jobId: z.string().nonempty('Job ID required'),
  name: z.string().nonempty('Name required'),
  email: z.string().email('Invalid email').nonempty('Email required'),
  phoneNumber: z.string().regex(phoneRegex).nonempty('Phone number required'),
  resume: z.any(),
  coverLetter: z.string(),
});

export type ApplyFormSchemaType = z.infer<typeof ApplyFormSchema>;
