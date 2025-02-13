import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';

import { Button } from '../ui/button';

import { ContactRound } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { Loader2 } from 'lucide-react';

import InputField from '../form-input/input-field';
import PasswordField from '../form-input/password-field';
import { RegisterFormSchema, RegisterFormSchemaType, Roles } from '@/types/schemas/register';
import { cn } from '@/lib/utils';
import { FcGoogle } from 'react-icons/fc';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormSchemaType) => void;
  onSocialRegister: (loginType: 'google' | 'github', role: string | null) => void;
  isLoading: boolean;
}

function RegisterForm(props: RegisterFormProps) {
  const form = useForm<RegisterFormSchemaType>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      retypePassword: '',
      role: Roles.CANDIDATE,
    },
    resolver: zodResolver(RegisterFormSchema),
  });

  const role = form.watch('role');

  const handleChangeRole = (role: Roles) => {
    form.setValue('role', role, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSocialRegister = async (loginType: 'google' | 'github') => {
    props.onSocialRegister(loginType, form.getValues('role'));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <div className="my-4 bg-lightGray p-2 rounded-sm flex gap-2">
          <Button
            type="button"
            onClick={() => handleChangeRole(Roles.CANDIDATE)}
            className={cn(
              'flex-1 bg-white text-black hover:bg-gray-100',
              role === Roles.CANDIDATE ? 'bg-black text-white hover:bg-black' : '',
            )}
          >
            <ContactRound />
            Candidate
          </Button>
          <Button
            type="button"
            onClick={() => handleChangeRole(Roles.EMPLOYER)}
            className={cn(
              'flex-1 bg-white text-black hover:bg-gray-100',
              role === Roles.EMPLOYER ? 'bg-black text-white hover:bg-black' : '',
            )}
          >
            <Building2 />
            Employer
          </Button>
        </div>

        <div>
          <Button
            variant="outline"
            className="shadow-md w-full"
            disabled={props.isLoading}
            type="button"
            onClick={() => handleSocialRegister('google')}
          >
            <FcGoogle />
            Register with Google account
          </Button>
        </div>

        <div className="w-full h-[1px] bg-black my-2"></div>

        <InputField control={form.control} label="Email" placeholder="Email address" name="email" />
        <InputField control={form.control} label="Compnay/Candidate name" placeholder="Name" name="name" />
        <PasswordField control={form.control} label="Password" placeholder="Password" name="retypePassword" />
        <PasswordField
          control={form.control}
          label="Confirm password"
          placeholder="Re-type your password"
          name="password"
        />

        <Button type="submit" disabled={props.isLoading} className="w-full mt-4">
          {props.isLoading && <Loader2 className="animate-spin" />}
          Register
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
