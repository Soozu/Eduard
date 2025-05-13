import React from 'react';
import MapView from '../components/map/MapView';

const MapPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <MapView />
    </div>
  );
};

export default MapPage;