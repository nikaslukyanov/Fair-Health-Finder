import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = "AIzaSyBoOak0ZV4Cln-yGCg0Z461MiGwemO6JqE";

function MapComponent({children}) {
    return (
        <div>
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 40.808452, lng: -73.960}}
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                >
                    {children}
                </Map>
                
            </APIProvider>
        </div>
    )
}

export default MapComponent;
