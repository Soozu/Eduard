import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCities from '../components/home/FeaturedCities';
import CategoryExplorer from '../components/home/CategoryExplorer';
import { MapPin, MessageSquare, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Cities Section */}
      <FeaturedCities />
      
      {/* Category Explorer Section */}
      <CategoryExplorer />
      
      {/* Feature Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-gray-900 text-center">
            Explore the Philippines with WerTigo
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto text-center">
            Plan your perfect Philippine adventure with our comprehensive travel tools.
          </p>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Map Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Interactive Map</h3>
              <p className="text-gray-600 mb-5">
                Discover the best places across the Philippines with our interactive map that helps you visualize your journey.
              </p>
              <Link to="/map" className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center">
                Explore the Map
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Chat Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 text-accent-600 mb-4">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Travel Assistant</h3>
              <p className="text-gray-600 mb-5">
                Get personalized recommendations and answers to all your questions about traveling in the Philippines.
              </p>
              <Link to="/chat" className="text-accent-500 font-medium hover:text-accent-600 inline-flex items-center">
                Chat with Assistant
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Discover Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <Compass size={32} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Discover Places</h3>
              <p className="text-gray-600 mb-5">
                Find the best restaurants, attractions, and hidden gems across all Philippine destinations.
              </p>
              <Link to="/search" className="text-secondary-500 font-medium hover:text-secondary-600 inline-flex items-center">
                Start Discovering
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold">
            Ready to Explore the Philippines?
          </h2>
          <p className="mt-3 text-xl text-primary-100 max-w-2xl mx-auto">
            Start your journey today and discover the best of what the Philippines has to offer.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/map" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
              Explore the Map
            </Link>
            <Link to="/chat" className="btn bg-primary-700 text-white hover:bg-primary-800 px-8 py-3 text-lg font-medium">
              Get Recommendations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;