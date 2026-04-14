import { type ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ children, defaultValue, className = '' }: TabsProps) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  return (
    <button type="button" className={`rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 ${className}`}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  return <div className={className}>{children}</div>;
}
