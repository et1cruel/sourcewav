import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-lg border border-border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3 className={cn('text-2xl font-bold tracking-tight', className)} {...props} />
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props} />
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
  );
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
export default Card;