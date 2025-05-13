import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cities } from '../../data/cities';
import { places } from '../../data/places';
import { City, Place, PlaceCategory } from '../../types';
import { Compass, Search, X } from 'lucide-react';

// Marker icons
const createIcon = (color: string) => {
  return L.divIcon({
    className: `map-marker map-marker-${color}`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: `<div style="background-color:${color}; width:100%; height:100%; display:flex; align-items:center; justify-content:center; border-radius:50%; box-shadow:0 2px 5px rgba(0,0,0,0.2)"></div>`
  });
};

const cityIcon = createIcon('#1A73E8');
const restaurantIcon = createIcon('#FFA726');
const attractionIcon = createIcon('#34A853');

// Map center for Philippines
const PHILIPPINES_CENTER: [number, number] = [12.8797, 121.7740];
const DEFAULT_ZOOM = 6;

interface MapViewProps {
  standalone?: boolean;
  selectedCity?: City;
  selectedCategory?: PlaceCategory;
}

const MapView: React.FC<MapViewProps> = ({ 
  standalone = true, 
  selectedCity, 
  selectedCategory 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>(cities);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(places);
  const [selectedLocation, setSelectedLocation] = useState<City | Place | null>(null);

  // Filter places based on selectedCity and selectedCategory
  useEffect(() => {
    if (selectedCity) {
      const cityPlaces = places.filter(place => place.cityId === selectedCity.id);
      setFilteredPlaces(selectedCategory 
        ? cityPlaces.filter(place => place.category === selectedCategory)
        : cityPlaces
      );
    } else {
      setFilteredPlaces(selectedCategory 
        ? places.filter(place => place.category === selectedCategory)
        : places
      );
    }
  }, [selectedCity, selectedCategory]);

  // Filter cities and places based on search term
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      
      const matchedCities = cities.filter(city => 
        city.name.toLowerCase().includes(term) || 
        city.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setFilteredCities(matchedCities);
      
      const matchedPlaces = places.filter(place => 
        place.name.toLowerCase().includes(term) || 
        place.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setFilteredPlaces(matchedPlaces);
    } else {
      setFilteredCities(cities);
      
      if (selectedCity) {
        setFilteredPlaces(places.filter(place => place.cityId === selectedCity.id));
      } else {
        setFilteredPlaces(places);
      }
    }
  }, [searchTerm, selectedCity]);

  // Calculate map center and zoom
  let mapCenter = PHILIPPINES_CENTER;
  let mapZoom = DEFAULT_ZOOM;
  
  if (selectedCity) {
    mapCenter = selectedCity.position;
    mapZoom = 10;
  }

  const getMarkerIcon = (item: City | Place) => {
    if ('cityId' in item) {
      // It's a place
      return item.category === 'restaurant' ? restaurantIcon : attractionIcon;
    } else {
      // It's a city
      return cityIcon;
    }
  };

  return (
    <div className={`${standalone ? 'pt-16' : ''} flex flex-col h-full w-full`}>
      {/* Map Container */}
      <div className="relative flex-grow z-0">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%' }} 
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Cities Markers */}
          {filteredCities.map(city => (
            <Marker 
              key={`city-${city.id}`}
              position={city.position}
              icon={cityIcon}
              eventHandlers={{
                click: () => setSelectedLocation(city)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{city.name}</h3>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Places Markers */}
          {filteredPlaces.map(place => (
            <Marker 
              key={`place-${place.id}`}
              position={place.position}
              icon={getMarkerIcon(place)}
              eventHandlers={{
                click: () => setSelectedLocation(place)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">{place.name}</h3>
                  <p className="text-sm text-gray-600">{place.category}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Map controller to update view when props change */}
          <MapViewController center={mapCenter} zoom={mapZoom} />
        </MapContainer>
        
        {/* Search overlay */}
        {standalone && (
          <div className="absolute top-4 left-0 right-0 z-10 px-4">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cities, attractions or restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 py-3 w-full bg-white shadow-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Location info card */}
        {selectedLocation && (
          <div className="absolute bottom-6 left-0 right-0 px-4 z-10">
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-32">
                <img 
                  src={'image' in selectedLocation ? selectedLocation.image : 'https://images.pexels.com/photos/2765871/pexels-photo-2765871.jpeg'} 
                  alt={'name' in selectedLocation ? selectedLocation.name : 'Location'}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={() => setSelectedLocation(null)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{selectedLocation.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-700">{selectedLocation.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex gap-1">
                    {selectedLocation.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Compass control */}
        <div className="absolute right-4 bottom-20 z-10">
          <button
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
            onClick={() => {
              setSelectedLocation(null);
              // Reset view to default
            }}
          >
            <Compass size={20} className="text-primary-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Component to update map view when props change
interface MapViewControllerProps {
  center: [number, number];
  zoom: number;
}

const MapViewController: React.FC<MapViewControllerProps> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

export default MapView;