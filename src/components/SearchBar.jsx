import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { getCityAutocomplete } from '../services/weatherService';

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const cityResults = await getCityAutocomplete(query);
        setSuggestions(cityResults);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (city) => {
    onCitySelect(`${city.name},${city.country}`);
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onCitySelect(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button 
          type="submit" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </form>

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 overflow-hidden border border-gray-200">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">Loading...</div>
          ) : (
            <ul>
              {suggestions.map((city) => (
                <li 
                  key={city.id}
                  onClick={() => handleSuggestionClick(city)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;