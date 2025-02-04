import { z } from 'zod';

export enum Roles {
  CANDIDATE = 'applicant',
  EMPLOYER = 'employer',
}

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    retypePassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    role: z.nativeEnum(Roles),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: 'Passwords do not match',
    path: ['retypePassword'],
  });
