import { cn } from '@/presentation/shared/lib/utils';
import { ButtonProps } from '@/presentation/shared/ui-model/shared.model';

export const Button = ({
  children,
  variant = 'primary',
  iconRight,
  iconLeft,
  dataTestId,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={props.type || 'button'}
      data-testid={dataTestId}
      {...props}
      className={cn(
        'w-full flex items-center justify-center gap-2 rounded-xl font-bold uppercase whitespace-nowrap transition-colors duration-150 cursor-pointer',
        'px-4 h-11',
        'md:px-6 md:h-14',
        variant === 'primary' &&
          'bg-primary-button text-white hover:brightness-110',
        variant === 'secondary' &&
          'bg-secondary-button text-white hover:bg-main',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        className
      )}
    >
      {iconLeft && (
        <span className="text-lg flex items-center">{iconLeft}</span>
      )}
      <span>{children}</span>
      {iconRight && (
        <span className="text-lg flex items-center">{iconRight}</span>
      )}
    </button>
  );
};
