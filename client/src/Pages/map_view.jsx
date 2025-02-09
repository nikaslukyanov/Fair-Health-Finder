import { useState } from 'react';
import MapComponent from "../components/maps/MapComponent";
import MapMarkerComponent from "../components/maps/MapMarker";
import {AdvancedMarker, Pin, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';

function MapView() {
  const data = require('../data/hospital_stats_ny_with_costs_with_loc.json');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [modal, setModal] = useState(false);
  

  return (
    <div>
      <MapComponent>

        {Object.keys(data).filter(key => data[key]["lat"] != null).map((key) => {
          return (
            <MapMarkerComponent details={data[key]} />
          )
        })}
      </MapComponent>
    </div>
  );
}

export default MapView;