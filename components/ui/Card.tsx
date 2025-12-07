import React from 'react';
import { THEME } from '@/lib/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', highlight = false }) => (
  <div className={`
    relative overflow-hidden
    bg-white dark:bg-[#1E1E1E] ${THEME.radius} p-5 ${THEME.shadow}
    ${highlight ? 'border border-[#22B550]/30 ring-4 ring-[#22B550]/5' : 'border border-gray-50 dark:border-[#333]'}
    transition-all duration-300 hover:shadow-xl hover:-translate-y-1
    ${className}
  `}>
    {children}
  </div>
);
