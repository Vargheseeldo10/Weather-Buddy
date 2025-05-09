import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'weatherApp_favorites';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const addFavorite = (city) => {
    
    if (!favorites.some(fav => fav.name === city.name && fav.country === city.country)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (cityId) => {
    setFavorites(favorites.filter(city => city.id !== cityId));
  };

  const isFavorite = (cityName, country) => {
    return favorites.some(city => city.name === cityName && city.country === country);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};

export default useFavorites;