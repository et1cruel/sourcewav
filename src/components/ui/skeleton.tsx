import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-secondary', className)}
    />
  );
}

export function SkeletonCircle({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-full bg-secondary', className)}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 w-full rounded-md bg-secondary animate-pulse" />
      ))}
    </div>
  );
}

export default Skeleton;