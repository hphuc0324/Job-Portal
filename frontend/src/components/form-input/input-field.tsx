import { Control } from 'react-hook-form';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface InputFieldProps {
  control: Control<any>;
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  icon?: React.ReactNode | undefined;
  classes?: string | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
}

function InputField(props: InputFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input type={props.type || 'text'} {...field} placeholder={props.placeholder} className={props.classes} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputField;
