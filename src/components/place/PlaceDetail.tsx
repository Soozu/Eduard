import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { places } from '../../data/places';
import { cities } from '../../data/cities';
import { Star, MapPin, ArrowLeft, ExternalLink, Phone, Clock, DollarSign } from 'lucide-react';
import MapView from '../map/MapView';

const PlaceDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const place = places.find(place => place.id === placeId);
  
  if (!place) {
    return <Navigate to="/not-found" />;
  }
  
  const city = cities.find(city => city.id === place.cityId);
  
  // Format category for display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
          <Link
            to={city ? `/city/${city.id}` : '/search'}
            className="absolute top-20 left-4 sm:left-8 flex items-center text-white bg-black/30 hover:bg-black/50 px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            {city ? `Back to ${city.name}` : 'Back to Search'}
          </Link>
          
          <div className="max-w-4xl w-full text-center">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
              {formatCategory(place.category)}
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">{place.name}</h1>
            
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center text-yellow-400 mr-4">
                <Star className="fill-yellow-400" size={18} />
                <span className="ml-1">{place.rating.toFixed(1)}</span>
              </div>
              
              {place.priceLevel && (
                <div className="flex items-center mr-4">
                  <span>{'$'.repeat(place.priceLevel)}</span>
                </div>
              )}
              
              {city && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <Link to={`/city/${city.id}`} className="hover:underline">
                    {city.name}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom -mt-16 relative z-10">
        <div className="bg-white rounded-t-xl shadow-xl p-6 sm:p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {place.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            {place.description}
          </p>
          
          {/* Information Section */}
          <div className="mt-10 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <MapPin className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600 mt-1">123 Main Street, {city?.name || 'Philippines'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Contact</h3>
                  <p className="text-gray-600 mt-1">+63 123 456 7890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Opening Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Friday: 8:00 AM - 10:00 PM<br />
                    Saturday - Sunday: 9:00 AM - 11:00 PM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <ExternalLink className="text-primary-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Website</h3>
                  <a href="#" className="text-primary-500 hover:underline mt-1 inline-block">
                    www.{place.name.toLowerCase().replace(/\s+/g, '')}.com
                  </a>
                </div>
              </div>
              
              {place.priceLevel && (
                <div className="flex items-start">
                  <DollarSign className="text-primary-500 mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Price Range</h3>
                    <p className="text-gray-600 mt-1">
                      {place.priceLevel === 1 && 'Inexpensive'}
                      {place.priceLevel === 2 && 'Moderate'}
                      {place.priceLevel === 3 && 'Expensive'}
                      {place.priceLevel === 4 && 'Very Expensive'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Map Section */}
          <section className="mt-10">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">Location</h2>
            
            <div className="h-80 rounded-lg overflow-hidden shadow-md">
              <MapView 
                standalone={false} 
                selectedCity={city} 
                selectedCategory={place.category as any}
              />
            </div>
            
            <div className="flex justify-center mt-6">
              <Link
                to="/map"
                className="btn-primary"
              >
                View on Full Map
              </Link>
            </div>
          </section>
          
          {/* Similar places section - simplified for this implementation */}
          <section className="mt-12">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              Similar {formatCategory(place.category)}s
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {places
                .filter(p => 
                  p.id !== place.id && 
                  p.category === place.category && 
                  (p.cityId === place.cityId || !p.cityId)
                )
                .slice(0, 3)
                .map(similarPlace => (
                  <Link 
                    key={similarPlace.id}
                    to={`/place/${similarPlace.id}`}
                    className="card card-hover overflow-hidden"
                  >
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={similarPlace.image} 
                        alt={similarPlace.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900">{similarPlace.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-yellow-400" size={14} />
                          <span className="ml-1 text-sm">{similarPlace.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {cities.find(c => c.id === similarPlace.cityId)?.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;