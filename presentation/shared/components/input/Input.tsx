'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/presentation/shared/lib/utils';
import { InputProps } from '@/presentation/shared/ui-model/shared.model';

export const Input = ({
  label,
  icon,
  id,
  dataTestId,
  registerWithMaskConfig,
  showPasswordToggle = false,
  type = 'text',
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const canTogglePassword = showPasswordToggle && type === 'password';
  const inputType = canTogglePassword && isPasswordVisible ? 'text' : type;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-zinc-400 tracking-widest uppercase pl-1"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'input-container flex items-center gap-2 px-3 py-2 bg-background-input rounded-lg border border-border-default',
          'hover:border-border-hover',
          props.disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {icon && <span className="text-zinc-500 text-lg">{icon}</span>}
        <input
          id={id}
          type={inputType}
          aria-label={!label ? props.placeholder : undefined}
          data-testid={dataTestId}
          {...props}
          {...(registerWithMaskConfig || {})}
          className={cn(
            'flex-1 h-11 outline-none text-zinc-100 placeholder:text-placeholder text-base md:text-sm bg-transparent',
            '[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer',
            icon ? 'pl-0' : 'pl-1',
            props.className
          )}
        />
        {canTogglePassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((current) => !current)}
            aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={isPasswordVisible}
            disabled={props.disabled}
            className=" cursor-pointer inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};
