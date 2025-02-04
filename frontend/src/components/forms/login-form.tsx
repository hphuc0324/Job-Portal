import { LoginFormSchemaType, LoginFormSchema } from '@/types/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import InputField from '../form-input/input-field';
import PasswordField from '../form-input/password-field';
import { Button } from '../ui/button';

interface LoginFormProps {
  onSubmit: (values: LoginFormSchemaType) => void;
  isLoading: boolean;
}

function LoginForm(props: LoginFormProps) {
  const form = useForm<LoginFormSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <InputField control={form.control} name="email" label="Email" placeholder="Enter your email" />
        <PasswordField control={form.control} name="password" label="Password" placeholder="Enter your password" />

        <Button className="w-full mt-4">Continue</Button>
      </form>
    </Form>
  );
}

export default LoginForm;
