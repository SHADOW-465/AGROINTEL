import React from 'react';
import { THEME } from '@/lib/theme';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'glass';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick, disabled, icon: Icon }) => {
  const baseStyle = "flex items-center justify-center font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 cursor-pointer";

  const variants = {
    primary: `bg-gradient-to-r ${THEME.colors.primaryGradient} text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40`,
    secondary: `bg-white dark:bg-[#2D2D2D] border border-gray-100 dark:border-[#404040] text-[#2C3E50] dark:text-gray-200 shadow-sm hover:bg-gray-50`,
    tertiary: `bg-green-50 text-[#22B550] dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100`,
    glass: `bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30`,
  };

  const sizes = "px-6 py-4 rounded-2xl text-sm"; // Larger touch targets

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};
