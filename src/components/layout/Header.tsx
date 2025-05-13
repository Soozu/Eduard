import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Map, MessageSquare, Home, Search } from 'lucide-react';
import Logo from '../common/Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className={`h-10 w-auto ${isScrolled ? 'text-primary-600' : 'text-primary-500'}`} />
          <span className={`ml-2 text-xl font-display font-bold ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}>
            WerTigo
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" icon={<Home size={18} />} label="Home" isScrolled={isScrolled} />
          <NavLink to="/map" icon={<Map size={18} />} label="Explore Map" isScrolled={isScrolled} />
          <NavLink to="/search" icon={<Search size={18} />} label="Discover" isScrolled={isScrolled} />
          <NavLink to="/chat" icon={<MessageSquare size={18} />} label="Travel Assistant" isScrolled={isScrolled} />
          
          <button className="btn-primary ml-4">
            Plan Your Trip
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
          <div className="container-custom py-4 space-y-2">
            <MobileNavLink to="/" icon={<Home size={18} />} label="Home" />
            <MobileNavLink to="/map" icon={<Map size={18} />} label="Explore Map" />
            <MobileNavLink to="/search" icon={<Search size={18} />} label="Discover" />
            <MobileNavLink to="/chat" icon={<MessageSquare size={18} />} label="Travel Assistant" />
            
            <button className="btn-primary w-full mt-4">
              Plan Your Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-primary-50 text-primary-600' 
          : isScrolled 
            ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50' 
            : 'text-white hover:text-white hover:bg-white/20'
      }`}
    >
      <span className="mr-1.5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
        isActive 
          ? 'bg-primary-50 text-primary-600' 
          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default Header;