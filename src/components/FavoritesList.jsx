import React from 'react';
import { Star, X } from 'lucide-react';

const FavoritesList = ({ favorites, onSelectCity, onRemoveFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <Star size={18} className="text-gray-400 mr-2" />
        <p className="text-gray-500 text-m">Save your favorite cities here</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2">
        {favorites.map((city) => (
          <div 
            key={city.id}
            className="flex items-center space-x-1 bg-white py-1 px-3 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <button
              onClick={() => onSelectCity(`${city.name},${city.country}`)}
              className="text-sm font-medium"
            >
              {city.name}
            </button>
            <button
              onClick={() => onRemoveFavorite(city.id)}
              className="ml-1 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={`Remove ${city.name} from favorites`}
            >
              <X size={12} className="text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;