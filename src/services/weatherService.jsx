import axios from 'axios';


const API_KEY = '88b0b984e8ae570265a3c2626ad8e645';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city, units = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units
      }
    });

    const { data } = response;
    return {
      cityName: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: new Date().getTime()
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

export const getCityAutocomplete = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY
      }
    });
    
    return response.data.map(city => ({
      name: city.name,
      country: city.country,
      id: `${city.name}-${city.country}-${city.lat}-${city.lon}`
    }));
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};