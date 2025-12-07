import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'success' | 'warning' | 'critical' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, type = 'success', className = '' }) => {
  const styles = {
    success: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 dark:from-green-900/40 dark:to-green-900/20 dark:text-green-400 dark:border-green-800',
    warning: 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 dark:from-orange-900/40 dark:to-orange-900/20 dark:text-orange-400 dark:border-orange-800',
    critical: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200 dark:from-red-900/40 dark:to-red-900/20 dark:text-red-400 dark:border-red-800',
    neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[type]} ${className}`}>
      {children}
    </span>
  );
};
