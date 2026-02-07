import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FaSearch, FaMapMarkerAlt, FaLocationArrow, FaTaxi, FaTimes } from 'react-icons/fa';
import { Bus, Train } from 'lucide-react';
import GoogleMapComponent from '../../components/map/GoogleMapComponent';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const RouteChecker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transportMode, setTransportMode] = useState('bus');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [routeDetails, setRouteDetails] = useState({ distance: '0 km', duration: '0 mins' });

  // Provider for OSM Search (We keep this for search, results are passed to Google Map)
  const provider = new OpenStreetMapProvider();

  // Mock Current Location (Colombo Fort area)
  const currentLocation = { lat: 6.9344, lng: 79.8526, name: "Your Location" };

  // Real Destination Search
  const handleSearchInput = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const results = await provider.search({ query: query + ', Sri Lanka' });
        setSearchResults(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Search failed:", error);
      }
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }

    if (query === '') {
      setSelectedDestination(null);
      setSearchResults([]);
      setRouteDetails({ distance: '0 km', duration: '0 mins' });
    }
  };

  const handleSelectDestination = (result) => {
    const dest = {
      name: result.label ? result.label.split(',')[0] : "Selected Location",
      lat: parseFloat(result.y || result.lat),
      lng: parseFloat(result.x || result.lng),
      fullAddress: result.label || "Custom Location"
    };

    setSelectedDestination(dest);
    setSearchQuery(dest.name);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedDestination(null);
    setShowSuggestions(false);
    setSearchResults([]);
    setRouteDetails({ distance: '0 km', duration: '0 mins' });
  };

  // Callback from Google Map when route is calculated
  const handleRouteFound = (details) => {
    setRouteDetails(details);
  };

  // Initial Stops (just for visuals before route)
  const getStops = () => {
    if (selectedDestination) {
      return [
        { position: currentLocation, name: "Start" },
        { position: selectedDestination, name: "End" }
      ];
    }
    return [
      { position: { lat: 6.9271, lng: 79.8612 }, name: "Central Bus Stand" }
    ];
  };

  const modes = [
    { id: 'bus', label: 'Bus', icon: <Bus size={18} /> },
    { id: 'train', label: 'Train', icon: <Train size={18} /> },
    { id: 'taxi', label: 'Taxi', icon: <FaTaxi size={16} /> },
  ];

  const [fromQuery, setFromQuery] = useState('My Current Location');

  // Calculate Price and Points based on distance (mock logic)
  const calculateTripDetails = (distanceText) => {
    const distVal = parseFloat(distanceText.replace(/[^0-9.]/g, ''));
    if (isNaN(distVal)) return { price: 0, points: 0 };
    const price = Math.round(50 + (distVal * 40)); // Mock: 50 base + 40 per km
    const points = Math.floor(price * 0.1);
    return { price, points };
  };

  const tripStats = selectedDestination && routeDetails.duration !== '0 mins'
    ? calculateTripDetails(routeDetails.distance)
    : { price: 0, points: 0 };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4">
      {/* Sidebar / Search Panel */}
      <div className="w-full md:w-1/3 space-y-4 flex flex-col">
        <Card className="flex-none space-y-4 relative z-20">
          <h2 className="text-xl font-bold">Find Your Route</h2>

          {/* Transport Mode Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTransportMode(mode.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all
                                    ${transportMode === mode.id
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {mode.icon}
                {mode.label}
              </button>
            ))}
          </div>

          {/* From / To Inputs */}
          <div className="space-y-3 relative">
            {/* FROM Input */}
            <div className="relative group">
              <div className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-500">
                <FaLocationArrow size={14} />
              </div>
              <Input
                placeholder="From"
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
                className="pl-10 text-sm font-medium"
              // For now, we assume "From" is fixed or user types generic text.
              // To make it real search, we'd need another autocomplete handler.
              />
            </div>

            {/* Connector Line */}
            <div className="absolute left-[19px] top-10 bottom-10 w-0.5 border-l-2 border-dotted border-slate-300 z-0"></div>

            {/* TO Input */}
            <div className="relative group p-0">
              <div className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-red-500 z-10">
                <FaMapMarkerAlt size={14} />
              </div>
              <Input
                placeholder="Where to?"
                value={searchQuery} // Bound to the main search logic we built
                onChange={handleSearchInput}
                onFocus={() => {
                  if (searchQuery.length > 2) setShowSuggestions(true);
                }}
                className="pl-10 text-sm font-medium"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 z-10">
                  <FaTimes />
                </button>
              )}
            </div>

            <Button variant="primary" className="w-full mt-2" onClick={() => {
              // "Find Trip" could trigger explicit validation or animation
              // Currently, selection auto-triggers route.
            }}>
              Find Trip <FaSearch className="ml-2" />
            </Button>

            {/* Search Suggestions (Using existing logic) */}
            {showSuggestions && searchResults.length > 0 && (
              <div className="absolute top-[100px] left-0 right-0 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden max-h-60 overflow-y-auto z-50">
                {searchResults.map((result, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectDestination(result)}
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center gap-2 text-sm text-slate-700 border-b border-slate-50 last:border-0"
                  >
                    <FaMapMarkerAlt className="text-slate-400 shrink-0" />
                    <div className="truncate">{result.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Results List */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-y-auto p-2 space-y-2">
          {selectedDestination ? (
            <div className="p-4 border border-emerald-500 bg-emerald-50/50 rounded-xl cursor-pointer transition-all hover:bg-emerald-50">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-slate-800 text-lg capitalize flex items-center gap-2">
                  {transportMode === 'bus' && <Bus size={20} className="text-emerald-600" />}
                  {transportMode === 'train' && <Train size={20} className="text-emerald-600" />}
                  {transportMode === 'taxi' && <FaTaxi size={20} className="text-emerald-600" />}
                  Option 1
                </h4>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">Best Value</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Time</div>
                  <div className="font-bold text-slate-800 text-lg">{routeDetails.duration}</div>
                </div>
                <div className="text-center border-l border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Distance</div>
                  <div className="font-bold text-slate-800 text-lg">{routeDetails.distance}</div>
                </div>
                <div className="text-center border-l border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Price</div>
                  <div className="font-bold text-emerald-600 text-lg">Rs. {tripStats.price}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-100">
                <div className="text-xs text-slate-500">
                  Points you'll earn: <span className="font-bold text-amber-500">+{tripStats.points} pts</span>
                </div>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                  Book Now
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-center p-4">
              <FaMapMarkerAlt size={32} className="mb-2 opacity-50" />
              <p>Select a destination to see route options, prices, and time estimates.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full md:w-2/3 bg-slate-200 rounded-xl overflow-hidden relative shadow-inner border border-slate-200">
        <GoogleMapComponent
          origin={currentLocation}
          destination={selectedDestination}
          stops={getStops()}
          onRouteFound={handleRouteFound}
          onMapClick={(e) => {
            // e is from Google Map: { latlng: { lat, lng } }
            const dest = {
              name: "Selected Location",
              lat: e.latlng.lat,
              lng: e.latlng.lng
            };
            handleSelectDestination({
              label: "Selected Location",
              x: e.latlng.lng,
              y: e.latlng.lat
            });
          }}
        />

        {/* Floating Action Button for Mobile */}
        <button className="absolute bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg md:hidden z-10">
          <FaLocationArrow />
        </button>
      </div>
    </div>
  );
};

export default RouteChecker;
