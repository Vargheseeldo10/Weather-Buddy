import React from 'react';
import { Cloud, SunMoon, Moon, Sun } from 'lucide-react';

const Header = ({ units, onToggleUnits, activeTab, onTabChange, isDark, onToggleDarkMode }) => {
  return (
    <div className={`w-full ${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-blue-600 to-blue-400'} text-white p-4 sm:p-6 rounded-b-lg shadow-md`}>
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Cloud size={40} className="mr-2" />
          <h1 style={{fontFamily:'abril-fatface-regular'}} className="text-4xl font-bold">Weather Buddy</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <button 
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'weather' ? 'bg-white text-blue-600' : 'bg-blue-700/30 hover:bg-blue-700/50'}`}
              onClick={() => onTabChange('weather')}
            >
              Current Weather
            </button>
            <button 
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'compare' ? 'bg-white text-blue-600' : 'bg-blue-700/30 hover:bg-blue-700/50'}`}
              onClick={() => onTabChange('compare')}
            >
              Compare Cities
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleUnits}
              className="flex items-center bg-blue-700/30 hover:bg-blue-700/50 px-3 py-1 rounded-full text-sm transition-colors"
            >
              <SunMoon size={14} className="mr-1" />
              {units === 'metric' ? '°C' : '°F'}
            </button>
            
            <button
              onClick={onToggleDarkMode}
              className="flex items-center bg-blue-700/30 hover:bg-blue-700/50 px-3 py-1 rounded-full text-sm transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;