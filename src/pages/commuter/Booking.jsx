import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Bus, Train, MapPin, Calendar, Clock, RotateCcw, CheckCircle, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const navigate = useNavigate();
    const [transportType, setTransportType] = useState('bus'); // 'bus' or 'train'
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [date, setDate] = useState('');
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [bookingStep, setBookingStep] = useState(1); // 1: Search, 2: Select Trip, 3: Confirmation

    // Mock Data for Locations
    const locations = ["Central Station", "Pettah", "Fort", "Maradana", "Bambalapitiya", "Town Hall", "Kollonawa"];

    // Mock Data for Trips
    const mockTrips = [
        { id: 1, type: 'bus', from: 'Central Station', to: 'Town Hall', time: '08:30 AM', duration: '20 mins', price: 50, distance: 3.5, points: 10, operator: 'CityBus' },
        { id: 2, type: 'bus', from: 'Central Station', to: 'Town Hall', time: '09:00 AM', duration: '20 mins', price: 50, distance: 3.5, points: 10, operator: 'CityBus' },
        { id: 3, type: 'train', from: 'Fort', to: 'Maradana', time: '08:45 AM', duration: '10 mins', price: 20, distance: 2.1, points: 5, operator: 'SL Railways' },
        { id: 4, type: 'train', from: 'Fort', to: 'Bambalapitiya', time: '09:15 AM', duration: '15 mins', price: 30, distance: 5.4, points: 15, operator: 'SL Railways' },
    ];

    const [availableTrips, setAvailableTrips] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        // In a real app, calculate distance based on coordinates or map API.
        // filtering mock trips based on transport type and simple mock logic
        const results = mockTrips.filter(trip =>
            trip.type === transportType &&
            (fromLocation === '' || trip.from.toLowerCase().includes(fromLocation.toLowerCase())) &&
            (toLocation === '' || trip.to.toLowerCase().includes(toLocation.toLowerCase()))
        );
        setAvailableTrips(results);
        setBookingStep(2);
    };

    const handleSelectTrip = (trip) => {
        setSelectedTrip(trip);
        setBookingStep(3);
    };

    const handleReset = () => {
        setBookingStep(1);
        setSelectedTrip(null);
        setAvailableTrips([]);
        setFromLocation('');
        setToLocation('');
    };

    const handleConfirmBooking = () => {
        // Simulate API Booking
        alert(`Booking Confirmed for ${selectedTrip.operator} ${transportType.toUpperCase()}!\nPrice: LKR ${selectedTrip.price}\nPoints Earned: ${selectedTrip.points}`);
        navigate('/commuter/history'); // Redirect to history acting as "My Trips"
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                <Ticket className="text-emerald-600" /> Trip Planning & Booking
            </h1>

            {/* Step 1: Search Form */}
            {bookingStep === 1 && (
                <Card>
                    <div className="space-y-6">
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setTransportType('bus')}
                                className={`flex-1 py-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${transportType === 'bus' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                            >
                                <Bus size={32} />
                                <span className="font-bold">Bus Ticket</span>
                            </button>
                            <button
                                onClick={() => setTransportType('train')}
                                className={`flex-1 py-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${transportType === 'train' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                            >
                                <Train size={32} />
                                <span className="font-bold">Train Seat</span>
                            </button>
                        </div>

                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-600 ml-1">From</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        list="locations"
                                        placeholder="Origin Station"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        value={fromLocation}
                                        onChange={(e) => setFromLocation(e.target.value)}
                                        required
                                    />
                                    <datalist id="locations">
                                        {locations.map((loc, i) => <option key={i} value={loc} />)}
                                    </datalist>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-600 ml-1">To</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        list="locations"
                                        placeholder="Destination Station"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        value={toLocation}
                                        onChange={(e) => setToLocation(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-600 ml-1">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="date"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <Button type="submit" variant="primary" className="w-full py-3">
                                    Find Trips
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            )}

            {/* Step 2: Trip Selection */}
            {bookingStep === 2 && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-700">Available Trips</h2>
                        <button onClick={() => setBookingStep(1)} className="text-sm font-bold text-emerald-600 hover:underline">Change Search</button>
                    </div>

                    <div className="grid gap-4">
                        {availableTrips.length > 0 ? availableTrips.map(trip => (
                            <div key={trip.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex justify-between items-center group" onClick={() => handleSelectTrip(trip)}>
                                <div className="flex items-center gap-4">
                                    <div className="bg-slate-100 p-3 rounded-xl text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                        {trip.type === 'bus' ? <Bus /> : <Train />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">{trip.from} ➝ {trip.to}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {trip.time}</span>
                                            <span>•</span>
                                            <span>{trip.duration}</span>
                                            <span>•</span>
                                            <span>{trip.operator}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-lg text-slate-800">LKR {trip.price}</div>
                                    <div className="text-xs font-bold text-emerald-600">+{trip.points} pts</div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <p>No trips found matching your criteria.</p>
                                <button onClick={() => setBookingStep(1)} className="text-emerald-600 font-bold mt-2">Try different search</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Step 3: Confirmation */}
            {bookingStep === 3 && selectedTrip && (
                <div className="max-w-md mx-auto">
                    <Card className="border-t-4 border-t-emerald-500">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Confirm Booking</h2>
                            <p className="text-sm text-slate-500">Review your trip details before booking.</p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Route</span>
                                <span className="font-bold text-slate-800">{selectedTrip.from} ➝ {selectedTrip.to}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Transport</span>
                                <span className="font-bold text-slate-800 capitalize flex items-center gap-1">
                                    {selectedTrip.type === 'bus' ? <Bus size={14} /> : <Train size={14} />} {selectedTrip.type}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Departure</span>
                                <span className="font-bold text-slate-800">{selectedTrip.time} ({date || 'Today'})</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Distance</span>
                                <span className="font-bold text-slate-800">{selectedTrip.distance} km</span>
                            </div>
                            <div className="h-px bg-slate-200 my-2"></div>
                            <div className="flex justify-between text-base">
                                <span className="font-bold text-slate-600">Total Price</span>
                                <span className="font-black text-emerald-600">LKR {selectedTrip.price}.00</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Green Points</span>
                                <span className="font-bold text-teal-600">+{selectedTrip.points} Points</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button onClick={handleConfirmBooking} variant="primary" className="w-full py-3 shadow-lg shadow-emerald-500/20">
                                <CheckCircle size={18} className="mr-2" /> Pay & Book Now
                            </Button>
                            <button onClick={handleReset} className="w-full py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors">
                                Cancel
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Booking;
