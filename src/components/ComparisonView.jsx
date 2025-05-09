import React from 'react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import { ArrowLeftRight } from 'lucide-react';

const ComparisonView = ({ 
  left, 
  right, 
  leftWeather, 
  rightWeather, 
  units, 
  onSelectLeftCity, 
  onSelectRightCity,
  isDark // Added isDark prop for dark mode support
}) => {
 
  const getComparison = () => {
    if (!leftWeather?.weatherData || !rightWeather?.weatherData) return null;
    
    const leftData = leftWeather.weatherData;
    const rightData = rightWeather.weatherData;
    
    const tempDiff = Math.round(leftData.temperature - rightData.temperature);
    const humidityDiff = leftData.humidity - rightData.humidity;
    
    let tempComparison = '';
    if (Math.abs(tempDiff) <= 2) {
      tempComparison = 'Both cities have similar temperatures.';
    } else {
      tempComparison = `${leftData.cityName} is ${Math.abs(tempDiff)}° ${tempDiff > 0 ? 'warmer' : 'cooler'} than ${rightData.cityName}.`;
    }
    
    let humidityComparison = '';
    if (Math.abs(humidityDiff) <= 5) {
      humidityComparison = 'Humidity levels are similar in both cities.';
    } else {
      humidityComparison = `${leftData.cityName} is ${Math.abs(humidityDiff)}% ${humidityDiff > 0 ? 'more' : 'less'} humid than ${rightData.cityName}.`;
    }
    
    return { tempComparison, humidityComparison };
  };
  
  const comparison = getComparison();
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="mb-4 w-full">
            {/* Updated heading with conditional text color based on dark mode */}
            <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>First City</h3>
            <SearchBar onCitySelect={onSelectLeftCity} isDark={isDark} />
          </div>
          <WeatherCard 
            weatherData={leftWeather?.weatherData} 
            loading={leftWeather?.loading} 
            error={leftWeather?.error}
            units={units}
            isDark={isDark}
          />
        </div>
        
        <div className="hidden md:flex items-center justify-center self-center my-4">
          {/* Updated arrow background for dark mode */}
          <div className={`p-3 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-full`}>
            <ArrowLeftRight size={24} className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="mb-4 w-full">
            {/* Updated heading with conditional text color based on dark mode */}
            <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Second City</h3>
            <SearchBar onCitySelect={onSelectRightCity} isDark={isDark} />
          </div>
          <WeatherCard 
            weatherData={rightWeather?.weatherData} 
            loading={rightWeather?.loading} 
            error={rightWeather?.error}
            units={units}
            isDark={isDark}
          />
        </div>
      </div>
      
      {comparison && (
        <div className={`${isDark ? 'bg-blue-900 border-blue-800 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-700'} border rounded-lg p-4 mt-4`}>
          <h3 className={`text-lg font-medium ${isDark ? 'text-blue-100' : 'text-blue-800'} mb-2`}>Weather Comparison</h3>
          <ul className={`${isDark ? 'text-blue-200' : 'text-blue-700'} space-y-2`}>
            <li>{comparison.tempComparison}</li>
            <li>{comparison.humidityComparison}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComparisonView;