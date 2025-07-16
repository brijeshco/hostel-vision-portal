import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Building2 className="h-8 w-8 text-primary" />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-primary rounded-full animate-glow" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">HostelPortal</span>
          <span className="text-xs text-muted-foreground -mt-1">Management System</span>
        </div>
      )}
    </div>
  );
};