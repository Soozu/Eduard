import React from 'react';
import { Link } from 'react-router-dom';
import { Map, MessageSquare, Heart, Facebook, Twitter, Instagram, Globe, Phone, Mail } from 'lucide-react';
import Logo from '../common/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo className="h-10 w-auto text-primary-400" />
              <span className="ml-2 text-xl font-display font-bold text-white">
                WerTigo
              </span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Discover the beauty of the Philippines with WerTigo - your comprehensive travel guide to the best destinations, restaurants, and experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon icon={<Facebook size={20} />} href="#" label="Facebook" />
              <SocialIcon icon={<Twitter size={20} />} href="#" label="Twitter" />
              <SocialIcon icon={<Instagram size={20} />} href="#" label="Instagram" />
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/map" label="Explore Map" />
              <FooterLink to="/search" label="Discover Places" />
              <FooterLink to="/chat" label="Travel Assistant" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>
          
          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <FooterLink to="/city/manila" label="Manila" />
              <FooterLink to="/city/cebu" label="Cebu" />
              <FooterLink to="/city/boracay" label="Boracay" />
              <FooterLink to="/city/palawan" label="Palawan" />
              <FooterLink to="/city/bohol" label="Bohol" />
              <FooterLink to="/city/siargao" label="Siargao" />
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Globe className="mr-2 h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Travel Street, Manila, Philippines</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">+63 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">info@wertigo.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WerTigo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-500 hover:text-primary-400 text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-primary-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-primary-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>
            Made with <Heart size={12} className="inline text-red-500" /> in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-primary-400 transition-colors">
      {label}
    </Link>
  </li>
);

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href, label }) => (
  <a 
    href={href} 
    className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary-500 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

export default Footer;