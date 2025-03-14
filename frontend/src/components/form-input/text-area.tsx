import { Control } from 'react-hook-form';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from '../ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TextAreaProps {
  control: Control<any>;
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  icon?: React.ReactNode | undefined;
  classes?: string | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
}

function TextArea({ control, name, label, placeholder, icon, classes, type }: TextAreaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className={`resize-none ${classes}`} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextArea;
