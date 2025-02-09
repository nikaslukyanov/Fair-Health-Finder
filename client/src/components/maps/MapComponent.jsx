import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

function MapComponent({children}) {
    return (
        <div>
            <APIProvider apiKey={"AIzaSyBoOak0ZV4Cln-yGCg0Z461MiGwemO6JqE"}>
                <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 40.7128, lng: 74.0060}}
                defaultZoom={3}
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
