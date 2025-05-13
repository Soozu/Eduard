import React from 'react';
import { Compass } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return <Compass className={`${className}`} />;
};

export default Logo;