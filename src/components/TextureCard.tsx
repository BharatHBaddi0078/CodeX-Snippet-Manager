import React from 'react';
import { cn } from '@/lib/utils';

interface TextureCardProps {
  children: React.ReactNode;
  className?: string;
}

interface TextureCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TextureCardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface TextureCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface TextureCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface TextureSeparatorProps {
  className?: string;
}

export const TextureCard: React.FC<TextureCardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-[20px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg",
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)] before:opacity-50",
      className
    )}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const TextureCardHeader: React.FC<TextureCardHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  );
};

export const TextureCardContent: React.FC<TextureCardContentProps> = ({ children, className }) => {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
};

export const TextureCardFooter: React.FC<TextureCardFooterProps> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
};

export const TextureCardTitle: React.FC<TextureCardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
};

export const TextureSeparator: React.FC<TextureSeparatorProps> = ({ className }) => {
  return (
    <div className={cn("h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent", className)} />
  );
};