import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import FavoritesList from './components/FavoritesList';
import ComparisonView from './components/ComparisonView';
import Footer from './components/Footer';
import useWeather from './hooks/useWeather';
import useFavorites from './hooks/useFavorites';
import useDarkMode from './hooks/useDarkMode';

function App() {
  const [activeTab, setActiveTab] = useState('weather');
  const [selectedCity, setSelectedCity] = useState('');
  const [leftCity, setLeftCity] = useState('');
  const [rightCity, setRightCity] = useState('');
  const [isDark, setIsDark] = useDarkMode();
  
  
  const {
    weatherData,
    loading,
    error,
    updateCity,
    selectedUnits,
    toggleUnits,
    refetch
  } = useWeather();
  
  
  const leftWeather = useWeather();
  const rightWeather = useWeather();
  
  
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    updateCity(city);
  };
  
  const handleToggleFavorite = () => {
    if (!weatherData) return;
    
    const city = {
      name: weatherData.cityName,
      country: weatherData.country,
      id: `${weatherData.cityName}-${weatherData.country}`
    };
    
    if (isFavorite(weatherData.cityName, weatherData.country)) {
      removeFavorite(city.id);
    } else {
      addFavorite(city);
    }
  };
  
  const handleSelectFavorite = (city) => {
    handleCitySelect(city);
    setActiveTab('weather');
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        units={selectedUnits} 
        onToggleUnits={() => {
          toggleUnits();
          leftWeather.toggleUnits();
          rightWeather.toggleUnits();
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onToggleDarkMode={() => setIsDark(!isDark)}
      />
      
      <main className="container mx-auto max-w-4xl px-4 py-6 flex-grow">
        {/* Favorites Section */}
        <div className="mb-6">
          <h2 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Favorites</h2>
          <FavoritesList 
            favorites={favorites} 
            onSelectCity={handleSelectFavorite}
            onRemoveFavorite={removeFavorite}
            isDark={isDark}
          />
        </div>
        
        {activeTab === 'weather' ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mb-6">
              <h2 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Search for a city</h2>
              <SearchBar onCitySelect={handleCitySelect} isDark={isDark} />
            </div>
            
            <div className="w-full max-w-md">
              <WeatherCard 
                weatherData={weatherData} 
                loading={loading} 
                error={error} 
                units={selectedUnits}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={weatherData ? isFavorite(weatherData.cityName, weatherData.country) : false}
                isDark={isDark}
              />
            </div>
          </div>
        ) : (
          <ComparisonView 
            leftCity={leftCity}
            rightCity={rightCity}
            leftWeather={leftWeather}
            rightWeather={rightWeather}
            units={selectedUnits}
            onSelectLeftCity={(city) => {
              setLeftCity(city);
              leftWeather.updateCity(city);
            }}
            onSelectRightCity={(city) => {
              setRightCity(city);
              rightWeather.updateCity(city);
            }}
            isDark={isDark}
          />
        )}
      </main>
      
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;