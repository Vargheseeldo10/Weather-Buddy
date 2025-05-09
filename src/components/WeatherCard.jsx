import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, 
  Star, StarOff, Droplets, Wind, Thermometer 
} from 'lucide-react';

const WeatherCard = ({ 
  weatherData, 
  loading, 
  error, 
  units, 
  onToggleFavorite = null,
  isFavorite = false
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border-l-4 border-red-500">
        <h3 className="text-lg font-semibold text-red-500 mb-2">Error</h3>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border border-dashed border-gray-300 flex items-center justify-center">
        <p className="text-gray-500 text-center">Search for a city to see weather information</p>
      </div>
    );
  }

  const getWeatherIcon = (iconCode) => {
   
    const iconMap = {
      '01d': <Sun size={38} className="text-yellow-500" />,
      '01n': <Sun size={38} className="text-yellow-400" />,
      '02d': <Cloud size={38} className="text-gray-500" />,
      '02n': <Cloud size={38} className="text-gray-400" />,
      '03d': <Cloud size={38} className="text-gray-500" />,
      '03n': <Cloud size={38} className="text-gray-400" />,
      '04d': <Cloud size={38} className="text-gray-600" />,
      '04n': <Cloud size={38} className="text-gray-500" />,
      '09d': <CloudRain size={38} className="text-blue-500" />,
      '09n': <CloudRain size={38} className="text-blue-400" />,
      '10d': <CloudRain size={38} className="text-blue-500" />,
      '10n': <CloudRain size={38} className="text-blue-400" />,
      '11d': <CloudLightning size={38} className="text-yellow-600" />,
      '11n': <CloudLightning size={38} className="text-yellow-500" />,
      '13d': <CloudSnow size={38} className="text-blue-200" />,
      '13n': <CloudSnow size={38} className="text-blue-100" />,
      '50d': <CloudFog size={38} className="text-gray-400" />,
      '50n': <CloudFog size={38} className="text-gray-300" />
    };
    
    return iconMap[iconCode] || <Cloud size={38} className="text-gray-500" />;
  };

  
  const getCardBackground = (iconCode) => {
    const type = iconCode.substring(0, 2);
    const isDay = iconCode.endsWith('d');
    
    const backgroundMap = {
      '01': isDay ? 'bg-gradient-to-br from-blue-50 to-yellow-50' : 'bg-gradient-to-br from-indigo-900 to-blue-900',
      '02': isDay ? 'bg-gradient-to-br from-blue-50 to-gray-100' : 'bg-gradient-to-br from-indigo-900 to-gray-800',
      '03': 'bg-gradient-to-br from-gray-100 to-gray-200',
      '04': 'bg-gradient-to-br from-gray-200 to-gray-300',
      '09': 'bg-gradient-to-br from-blue-100 to-blue-200',
      '10': 'bg-gradient-to-br from-blue-100 to-gray-200',
      '11': 'bg-gradient-to-br from-purple-100 to-gray-200',
      '13': 'bg-gradient-to-br from-blue-50 to-gray-100',
      '50': 'bg-gradient-to-br from-gray-100 to-gray-200'
    };
    
    return backgroundMap[type] || 'bg-white';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const cardBackground = getCardBackground(weatherData.icon);
  const textColor = weatherData.icon.endsWith('n') && weatherData.icon.startsWith('01') ? 
    'text-white' : 'text-gray-800';

  return (
    <div className={`p-6 rounded-lg shadow-md w-full max-w-sm transition-all duration-500 ${cardBackground}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>
            {weatherData.cityName}, {weatherData.country}
          </h2>
          <p className={`text-sm ${textColor} opacity-75`}>
            Last updated: {formatTime(weatherData.timestamp)}
          </p>
        </div>
        
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <Star size={24} className="text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff size={24} className={`${textColor} opacity-75`} />
            )}
          </button>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {getWeatherIcon(weatherData.icon)}
          <div className="ml-4">
            <p className={`text-4xl font-bold ${textColor}`}>
              {Math.round(weatherData.temperature)}°{units === 'metric' ? 'C' : 'F'}
            </p>
            <p className={`capitalize ${textColor}`}>{weatherData.description}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Thermometer size={18} className={`mr-2 ${textColor} opacity-75`} />
          <div>
            <p className={`text-sm ${textColor} opacity-75`}>Feels like</p>
            <p className={`font-semibold ${textColor}`}>
              {Math.round(weatherData.feelsLike)}°{units === 'metric' ? 'C' : 'F'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Droplets size={18} className={`mr-2 ${textColor} opacity-75`} />
          <div>
            <p className={`text-sm ${textColor} opacity-75`}>Humidity</p>
            <p className={`font-semibold ${textColor}`}>{weatherData.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Wind size={18} className={`mr-2 ${textColor} opacity-75`} />
          <div>
            <p className={`text-sm ${textColor} opacity-75`}>Wind speed</p>
            <p className={`font-semibold ${textColor}`}>
              {weatherData.windSpeed} {units === 'metric' ? 'm/s' : 'mph'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;