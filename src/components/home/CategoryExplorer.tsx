import React, { useState } from 'react';
import { places } from '../../data/places';
import { Utensils, Landmark, Building, ShoppingBag, Moon } from 'lucide-react';
import { PlaceCategory } from '../../types';
import { Link } from 'react-router-dom';

const categories: { id: PlaceCategory; name: string; icon: React.ReactNode }[] = [
  { id: 'restaurant', name: 'Restaurants', icon: <Utensils size={20} /> },
  { id: 'attraction', name: 'Attractions', icon: <Landmark size={20} /> },
  { id: 'accommodation', name: 'Accommodations', icon: <Building size={20} /> },
  { id: 'shopping', name: 'Shopping', icon: <ShoppingBag size={20} /> },
  { id: 'nightlife', name: 'Nightlife', icon: <Moon size={20} /> },
];

const CategoryExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PlaceCategory>('restaurant');
  
  const filteredPlaces = places.filter(place => place.category === activeCategory).slice(0, 4);
  
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-display font-bold text-gray-900 text-center">
          Explore by Category
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto text-center">
          Find the best places to eat, visit, stay, shop, and enjoy nightlife across Philippine destinations.
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <Link
                key={place.id}
                to={`/place/${place.id}`}
                className="card card-hover overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{place.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-700">{place.rating.toFixed(1)}</span>
                    </div>
                    {place.priceLevel && (
                      <span className="text-sm text-gray-500">
                        {'$'.repeat(place.priceLevel)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No places found in this category.
            </div>
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to={`/search?category=${activeCategory}`}
            className="btn-outline"
          >
            View All {categories.find(c => c.id === activeCategory)?.name}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryExplorer;