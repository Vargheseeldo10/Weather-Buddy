import { useState, useEffect } from 'react';
import { getWeatherByCity } from '../services/weatherService';

const useWeather = (initialCity = null, units = 'metric') => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedUnits, setSelectedUnits] = useState(units);

  const fetchWeather = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCity(city, selectedUnits);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity, selectedUnits]);

  const updateCity = (city) => {
    setSelectedCity(city);
  };

  const toggleUnits = () => {
    setSelectedUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  return {
    weatherData,
    loading,
    error,
    updateCity,
    selectedUnits,
    toggleUnits,
    refetch: () => fetchWeather(selectedCity)
  };
};

export default useWeather;