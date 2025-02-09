import { useState, useEffect } from 'react';
import MapComponent from "../components/maps/MapComponent";
import MapMarkerComponent from "../components/maps/MapMarker";
import {AdvancedMarker, Pin, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';

function MapView() {
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [modal, setModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  
  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    
    // Load hospital data
    const hospitalData = require('../data/hospital_stats_ny_with_costs_with_loc.json');
    
    // Filter hospitals based on user profile if needed
    if (userData) {
      // You can implement your filtering logic here
      // For example, filtering based on user's health conditions
      const filteredData = Object.keys(hospitalData)
        .filter(key => {
          const hospital = hospitalData[key];
          // Add your filtering conditions here
          return hospital.lat != null; // Basic filter for now
        })
        .reduce((acc, key) => {
          acc[key] = hospitalData[key];
          return acc;
        }, {});
        
      setData(filteredData);
    } else {
      setData(hospitalData);
    }

    // Hide banner after 2 seconds
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Centered user notification banner */}
      {showBanner && (
        <div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-lg shadow-lg transition-opacity duration-500"
          style={{ opacity: showBanner ? 1 : 0 }}
        >
          <p className="text-gray-800 font-medium text-center">
            Welcome, {user?.firstname} {user?.lastname}
          </p>
        </div>
      )}

      <MapComponent>
        {Object.keys(data).map((key) => (
          <MapMarkerComponent 
            key={key} 
            details={data[key]} 
            userProfile={user}  // Pass user profile to marker component
          />
        ))}
      </MapComponent>
    </div>
  );
}

export default MapView;