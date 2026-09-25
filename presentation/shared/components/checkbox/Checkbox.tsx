import React from 'react';
import { cn } from '@/presentation/shared/lib/utils';
import { CheckboxProps } from '@/presentation/shared/ui-model/shared.model';

export const Checkbox = ({
  label,
  id,
  error,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-center gap-2 cursor-pointer select-none',
        className
      )}
    >
      <span className="relative flex items-center justify-center">
        <input
          id={id}
          type="checkbox"
          className={cn(
            'w-4 h-4 rounded border border-border-default bg-background-input transition-colors duration-150',
            'accent-secondary-button',
            error && 'border-red-500',
            'focus:outline-none focus:ring-2 focus:ring-primary/50'
          )}
          {...props}
        />
      </span>
      <span className="text-xs text-zinc-300">{label}</span>
    </label>
  );
};
