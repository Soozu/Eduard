import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { cities } from '../../data/cities';
import { places } from '../../data/places';
import { MapPin, Star, Clock, Phone, Globe, Utensils, Landmark, ArrowLeft } from 'lucide-react';
import MapView from '../map/MapView';

const CityDetail: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const city = cities.find(city => city.id === cityId);
  
  if (!city) {
    return <Navigate to="/not-found" />;
  }
  
  const cityPlaces = places.filter(place => place.cityId === city.id);
  const restaurants = cityPlaces.filter(place => place.category === 'restaurant');
  const attractions = cityPlaces.filter(place => place.category === 'attraction');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img 
          src={city.image} 
          alt={city.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
          <Link
            to="/"
            className="absolute top-20 left-4 sm:left-8 flex items-center text-white bg-black/30 hover:bg-black/50 px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Link>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-center">{city.name}</h1>
          
          <div className="flex items-center mt-4 text-yellow-400">
            <Star className="fill-yellow-400" size={20} />
            <span className="ml-1 text-lg">{city.rating.toFixed(1)}</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {city.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom -mt-16 relative z-10">
        <div className="bg-white rounded-t-xl shadow-xl p-6 sm:p-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            {city.description}
          </p>
          
          {/* Sections */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Restaurants Section */}
            <section>
              <div className="flex items-center mb-4">
                <Utensils className="text-accent-500 mr-2" size={24} />
                <h2 className="text-2xl font-display font-semibold text-gray-900">Top Restaurants</h2>
              </div>
              
              <div className="space-y-4">
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <Link 
                      key={restaurant.id}
                      to={`/place/${restaurant.id}`}
                      className="block p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                          <div className="flex items-center mt-1">
                            <Star className="text-yellow-400 fill-yellow-400" size={14} />
                            <span className="ml-1 text-sm text-gray-700">{restaurant.rating.toFixed(1)}</span>
                            {restaurant.priceLevel && (
                              <span className="ml-3 text-sm text-gray-500">
                                {'$'.repeat(restaurant.priceLevel)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{restaurant.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No restaurants listed for this city yet.</p>
                )}
                
                <Link 
                  to={`/search?city=${city.id}&category=restaurant`}
                  className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                >
                  View all restaurants
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>
            
            {/* Attractions Section */}
            <section>
              <div className="flex items-center mb-4">
                <Landmark className="text-secondary-500 mr-2" size={24} />
                <h2 className="text-2xl font-display font-semibold text-gray-900">Top Attractions</h2>
              </div>
              
              <div className="space-y-4">
                {attractions.length > 0 ? (
                  attractions.map((attraction) => (
                    <Link 
                      key={attraction.id}
                      to={`/place/${attraction.id}`}
                      className="block p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={attraction.image} 
                            alt={attraction.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium text-gray-900">{attraction.name}</h3>
                          <div className="flex items-center mt-1">
                            <Star className="text-yellow-400 fill-yellow-400" size={14} />
                            <span className="ml-1 text-sm text-gray-700">{attraction.rating.toFixed(1)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{attraction.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No attractions listed for this city yet.</p>
                )}
                
                <Link 
                  to={`/search?city=${city.id}&category=attraction`}
                  className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                >
                  View all attractions
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>
          </div>
          
          {/* Map Section */}
          <section className="mt-12">
            <div className="flex items-center mb-6">
              <MapPin className="text-primary-500 mr-2" size={24} />
              <h2 className="text-2xl font-display font-semibold text-gray-900">Explore {city.name} Map</h2>
            </div>
            
            <div className="h-96 rounded-lg overflow-hidden shadow-md">
              <MapView standalone={false} selectedCity={city} />
            </div>
            
            <div className="flex justify-center mt-6">
              <Link
                to="/map"
                className="btn-primary"
              >
                Open Full Map
              </Link>
            </div>
          </section>
          
          {/* Information Section */}
          <section className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Travel Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Clock className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Best Time to Visit</h3>
                  <p className="text-gray-600 mt-1">November to April (dry season) is ideal for visiting {city.name}. The weather is pleasant and perfect for outdoor activities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Local Language</h3>
                  <p className="text-gray-600 mt-1">Filipino and English are widely spoken. In some areas, local dialects like Cebuano, Ilocano, or Waray may be common.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Emergency Contacts</h3>
                  <p className="text-gray-600 mt-1">
                    National Emergency: 911<br />
                    Tourist Police: (02) 8524-1728
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Utensils className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Local Cuisine</h3>
                  <p className="text-gray-600 mt-1">Don't miss trying local specialties like Adobo, Sinigang, Lechon, and fresh seafood dishes that {city.name} is known for.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;