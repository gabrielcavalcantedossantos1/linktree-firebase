import { InputHTMLAttributes } from 'react';
import { Input } from '../input';

interface formFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string ;
}

export function FormField({ label, id, ...inputProps }: formFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-white font-medium mt-2 mb-2" htmlFor={id}>
        {label}
      </label>
      <Input {...inputProps} id={id} />
    </div>
  );
}
