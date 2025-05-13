import React from 'react';
import { Link } from 'react-router-dom';
import { cities } from '../../data/cities';
import { MapPin, Star } from 'lucide-react';

const FeaturedCities: React.FC = () => {
  const featuredCities = cities.filter(city => city.isFeatured);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Featured Cities
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl">
              Explore the most popular destinations in the Philippines, from vibrant urban centers to pristine island paradises.
            </p>
          </div>
          <Link 
            to="/search" 
            className="mt-4 md:mt-0 inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
          >
            View all cities
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CityCardProps {
  city: typeof cities[0];
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <Link to={`/city/${city.id}`} className="card group card-hover h-full">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={city.image} 
          alt={city.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center">
          <MapPin className="text-primary-400 mr-1.5" size={18} />
          <span className="text-white font-medium">{city.name}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="text-yellow-400 fill-yellow-400" size={18} />
            <span className="ml-1 text-gray-700 font-medium">{city.rating.toFixed(1)}</span>
          </div>
          <div className="flex gap-1">
            {city.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-600 line-clamp-3">{city.description}</p>
      </div>
    </Link>
  );
};

export default FeaturedCities;