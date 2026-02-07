import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 6.9271,
    lng: 79.8612
};

const libraries = ['places'];

const GoogleMapComponent = ({ routePath = [], stops = [], onMapClick, directionsResponse: externalDirections, origin, destination, onRouteFound }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [map, setMap] = React.useState(null);
    const [directions, setDirections] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    // Calculate Directions if origin/destination provided
    useEffect(() => {
        if (isLoaded && origin && destination) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                        if (onRouteFound && result.routes[0] && result.routes[0].legs[0]) {
                            const leg = result.routes[0].legs[0];
                            onRouteFound({
                                distance: leg.distance.text,
                                duration: leg.duration.text
                            });
                        }
                    } else {
                        console.error(`error fetching directions ${status}`);
                    }
                }
            );
        } else if (!destination) {
            setDirections(null);
        }
    }, [isLoaded, origin, destination, String(origin?.lat), String(destination?.lat)]); // Simple dependency fix

    // Use external directions if provided (legacy support), otherwise use internal
    const activeDirections = externalDirections || directions;

    // If we have stops but no directions, fit bounds to show all markers
    useEffect(() => {
        if (map && stops.length > 0 && !activeDirections) {
            const bounds = new window.google.maps.LatLngBounds();
            stops.forEach(stop => {
                if (stop.position && stop.position.lat) {
                    bounds.extend({ lat: stop.position.lat, lng: stop.position.lng });
                }
            });
            map.fitBounds(bounds);
        }
    }, [map, stops, activeDirections]);

    if (loadError) {
        return (
            <div className="h-full w-full bg-red-50 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-red-600 font-bold mb-2">Map Loading Failed</h3>
                <p className="text-sm text-red-500">{loadError.message}</p>
                <p className="text-xs text-slate-400 mt-2">Check your API Key and billing status.</p>
            </div>
        );
    }

    if (!isLoaded) return <div className="h-full w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Loading Google Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%', minHeight: '400px' }}
            center={defaultCenter}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={(e) => {
                if (onMapClick) {
                    onMapClick({ latlng: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
                }
            }}
            options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            {/* Render Real Directions if available */}
            {activeDirections && (
                <DirectionsRenderer
                    directions={activeDirections}
                    options={{
                        polylineOptions: {
                            strokeColor: '#059669', // Emerald 600
                            strokeWeight: 5
                        }
                    }}
                />
            )}

            {/* Fallback to simple markers if no directions yet, or to show specific stops on top */}
            {!activeDirections && stops.map((stop, index) => (
                <Marker
                    key={index}
                    position={stop.position}
                    title={stop.name}
                />
            ))}
        </GoogleMap>
    );
};

export default React.memo(GoogleMapComponent);
