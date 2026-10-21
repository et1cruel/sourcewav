import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  const variants = {
    default: 'bg-acidlime text-charcoal hover:bg-acidlime/90 text-sm font-bold py-2 px-4 rounded-lg transition',
    destructive: 'bg-red-500 text-white hover:bg-red-600 text-sm font-bold py-2 px-4 rounded-lg transition',
    outline: 'border border-border bg-transparent hover:bg-secondary text-sm font-bold py-2 px-4 rounded-lg transition',
    secondary: 'bg-secondary text-offwhite hover:bg-muted text-sm font-bold py-2 px-4 rounded-lg transition',
    ghost: 'text-muted hover:text-offwhite text-sm font-bold py-2 px-4 rounded-lg transition',
    link: 'text-acidlime hover:text-acidlime/90 text-sm font-bold underline-offset-4 transition',
  };
  const sizes = {
    default: 'h-10',
    sm: 'h-8 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-acidlime disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export default Button;