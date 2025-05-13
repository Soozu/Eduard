import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Map } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-display font-bold text-primary-500">404</h1>
        <h2 className="mt-2 text-3xl font-display font-semibold text-gray-900">Page Not Found</h2>
        <p className="mt-4 text-gray-600">
          Sorry, we couldn't find the page you're looking for. The destination might have moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go to Homepage
          </Link>
          <Link 
            to="/map" 
            className="btn-outline flex items-center justify-center gap-2"
          >
            <Map size={18} />
            Explore Map
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;