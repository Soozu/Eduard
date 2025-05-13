import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg" 
          alt="Beautiful beach in the Philippines"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative container-custom min-h-screen flex flex-col justify-center items-start py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl animate-fade-in">
          Discover the Beauty of the <span className="text-primary-400">Philippines</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl animate-slide-up">
          Explore the best destinations, local cuisines, and hidden gems across the stunning 7,641 islands of the Philippines with our interactive travel map.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <Link to="/map" className="btn-primary px-6 py-3 text-lg font-medium flex items-center gap-2">
            Explore Map <MapPin size={18} />
          </Link>
          <Link to="/search" className="btn-outline border-white text-white hover:bg-white/20 hover:border-white px-6 py-3 text-lg font-medium flex items-center gap-2">
            Discover Places <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-2xl animate-fade-in" style={{animationDelay: '0.3s'}}>
          <Stat value="7,641" label="Islands" />
          <Stat value="82+" label="Languages" />
          <Stat value="36,289 km" label="Coastline" />
          <Stat value="∞" label="Adventures" />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse-slow">
        <span className="text-white text-sm font-medium mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    </div>
  );
};

interface StatProps {
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl sm:text-3xl font-display font-bold text-white">{value}</p>
    <p className="text-sm sm:text-base text-gray-300 mt-1">{label}</p>
  </div>
);

export default Hero;