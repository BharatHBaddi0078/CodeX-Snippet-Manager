import React from 'react';
import { cn } from '@/lib/utils';

interface TextureButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'github';
  size?: 'default' | 'sm' | 'lg';
}

export const TextureButton: React.FC<TextureButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className,
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500 dark:from-gray-800 dark:to-gray-900 dark:text-white dark:hover:from-gray-700 dark:hover:to-gray-800",
    github: "bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 focus:ring-gray-600"
  };

  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        "before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity hover:before:opacity-10",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};