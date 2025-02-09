import MapComponent from "../components/maps/MapComponent";
import MapMarkerComponent from "../components/maps/MapMarker";

function MapView() {
  const data = require('../data/hospital_satisfaction_stats_ny_with_loc.json');

  return (
    <div>
      <MapComponent>

        {Object.keys(data).map((key) => {
          return (
            <MapMarkerComponent details={data[key]}>
              
            </MapMarkerComponent>
          )
        })}
      </MapComponent>
    </div>
  );
}

export default MapView;