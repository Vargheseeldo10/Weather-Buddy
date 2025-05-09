import React from 'react';
import { Info } from 'lucide-react';

const Footer = ({ isDark }) => {
  return (
    <footer className={`mt-auto py-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
      <div className="flex items-center justify-center">
        <Info size={14} className="mr-1" />
        <p>Data provided by OpenWeatherMap</p>
      </div>
      <p className="mt-1">&copy; {new Date().getFullYear()} Weather Buddy</p>
    </footer>
  );
};

export default Footer;