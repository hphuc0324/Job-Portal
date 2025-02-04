import { Control } from 'react-hook-form';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from '../ui/form';
import PasswordInput from '../password-input';

interface PasswordFieldProps {
  control: Control<any>;
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  icon?: React.ReactNode | undefined;
  classes?: string | undefined;
}

function PasswordField(props: PasswordFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <PasswordInput {...field} placeholder={props.placeholder} className={props.classes} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PasswordField;
