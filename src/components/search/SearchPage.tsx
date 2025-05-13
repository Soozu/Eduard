import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cities } from '../../data/cities';
import { places } from '../../data/places';
import { City, Place, PlaceCategory } from '../../types';
import { Search, X, MapPin, Star, Filter } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>(queryParams.get('city') || '');
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | ''>(
    (queryParams.get('category') as PlaceCategory) || ''
  );
  
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Update search when URL parameters change
  useEffect(() => {
    const cityParam = queryParams.get('city');
    const categoryParam = queryParams.get('category') as PlaceCategory | null;
    
    if (cityParam) setSelectedCity(cityParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [location.search]);
  
  // Filter results based on search term and filters
  useEffect(() => {
    // Filter cities
    let cityResults = cities;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      cityResults = cities.filter(city => 
        city.name.toLowerCase().includes(term) || 
        city.description.toLowerCase().includes(term) ||
        city.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredCities(cityResults);
    
    // Filter places
    let placeResults = places;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      placeResults = placeResults.filter(place => 
        place.name.toLowerCase().includes(term) || 
        place.description.toLowerCase().includes(term) ||
        place.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    if (selectedCity) {
      placeResults = placeResults.filter(place => place.cityId === selectedCity);
    }
    
    if (selectedCategory) {
      placeResults = placeResults.filter(place => place.category === selectedCategory);
    }
    
    setFilteredPlaces(placeResults);
  }, [searchTerm, selectedCity, selectedCategory]);
  
  const clearFilters = () => {
    setSelectedCity('');
    setSelectedCategory('');
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This triggers the useEffect above
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-primary-500 py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white text-center">
            Discover Philippine Destinations
          </h1>
          
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                className="input py-3 pl-12 pr-4 w-full shadow-lg"
                placeholder="Search cities, attractions, restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              
              <button 
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Filter size={20} />
              </button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="mt-4 bg-white rounded-lg shadow-md p-4 animate-fade-in">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      className="input"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">All Cities</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="input"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as PlaceCategory)}
                    >
                      <option value="">All Categories</option>
                      <option value="restaurant">Restaurants</option>
                      <option value="attraction">Attractions</option>
                      <option value="accommodation">Accommodations</option>
                      <option value="shopping">Shopping</option>
                      <option value="nightlife">Nightlife</option>
                    </select>
                  </div>
                  
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="self-end btn-outline py-2 px-4"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <div className="container-custom py-10">
        {/* Filter summary */}
        {(selectedCity || selectedCategory) && (
          <div className="mb-6 flex items-center flex-wrap gap-2">
            <span className="text-gray-600">Filters:</span>
            
            {selectedCity && (
              <div className="flex items-center bg-primary-50 text-primary-700 rounded-full px-3 py-1">
                <span>City: {cities.find(c => c.id === selectedCity)?.name}</span>
                <button 
                  onClick={() => setSelectedCity('')}
                  className="ml-1.5 text-primary-400 hover:text-primary-600"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {selectedCategory && (
              <div className="flex items-center bg-primary-50 text-primary-700 rounded-full px-3 py-1">
                <span>Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</span>
                <button 
                  onClick={() => setSelectedCategory('')}
                  className="ml-1.5 text-primary-400 hover:text-primary-600"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            <button
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Clear all
            </button>
          </div>
        )}
        
        {/* Search results */}
        <div className="mb-12">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Popular Destinations'}
          </h2>
          
          {filteredCities.length === 0 && filteredPlaces.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">No results found. Try different search terms or filters.</p>
            </div>
          ) : (
            <>
              {/* Cities section */}
              {filteredCities.length > 0 && !selectedCategory && (
                <div className="mb-10">
                  <h3 className="text-xl font-display font-semibold text-gray-800 mb-4">Cities</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCities.map(city => (
                      <Link 
                        key={city.id}
                        to={`/city/${city.id}`}
                        className="card card-hover h-full"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={city.image} 
                            alt={city.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute bottom-3 left-3 flex items-center">
                            <MapPin className="text-primary-400 mr-1" size={16} />
                            <span className="text-white font-medium">{city.name}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Star className="text-yellow-400 fill-yellow-400" size={16} />
                              <span className="ml-1 text-gray-700">{city.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex gap-1">
                              {city.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 line-clamp-2">{city.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Places section */}
              {filteredPlaces.length > 0 && (
                <div>
                  <h3 className="text-xl font-display font-semibold text-gray-800 mb-4">
                    {selectedCategory 
                      ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s` 
                      : 'Places'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlaces.map(place => (
                      <Link 
                        key={place.id}
                        to={`/place/${place.id}`}
                        className="card card-hover h-full"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={place.image} 
                            alt={place.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                            <span className="text-white font-medium">{place.name}</span>
                            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                              {place.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Star className="text-yellow-400 fill-yellow-400" size={16} />
                              <span className="ml-1 text-gray-700">{place.rating.toFixed(1)}</span>
                              {place.priceLevel && (
                                <span className="ml-2 text-gray-500 text-sm">
                                  {'$'.repeat(place.priceLevel)}
                                </span>
                              )}
                            </div>
                            <span className="text-primary-500 text-sm">
                              {cities.find(city => city.id === place.cityId)?.name}
                            </span>
                          </div>
                          <p className="text-gray-600 line-clamp-2">{place.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;