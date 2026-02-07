import React, { useState } from 'react';
import Card from '../../components/common/Card';
import { FaHistory, FaBus, FaTrain, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt, FaFilter } from 'react-icons/fa';

const TripHistory = () => {
    // Mock Data for History
    const [filter, setFilter] = useState('All');

    const historyData = [
        { id: 1, route: "Central Stn -> Downtown", cost: 150.00, date: "2023-10-25", time: "08:30 AM", mode: "Bus", status: "Completed" },
        { id: 2, route: "Suburb A -> Central Stn", cost: 200.00, date: "2023-10-24", time: "06:15 PM", mode: "Train", status: "Completed" },
        { id: 3, route: "Downtown -> Northside", cost: 350.00, date: "2023-10-23", time: "09:00 AM", mode: "Taxi", status: "Completed" },
        { id: 4, route: "Central Stn -> Airport", cost: 1200.00, date: "2023-10-20", time: "02:45 PM", mode: "Train", status: "Completed" },
        { id: 5, route: "Mall -> Home", cost: 100.00, date: "2023-10-18", time: "08:10 PM", mode: "Bus", status: "Cancelled" },
    ];

    const filteredData = filter === 'All' ? historyData : historyData.filter(item => item.mode === filter);

    const getModeIcon = (mode) => {
        switch (mode) {
            case 'Bus': return <FaBus />;
            case 'Train': return <FaTrain />;
            default: return <FaTicketAlt />;
        }
    };

    const getModeColor = (mode) => {
        switch (mode) {
            case 'Bus': return 'bg-blue-100 text-blue-600';
            case 'Train': return 'bg-orange-100 text-orange-600';
            default: return 'bg-purple-100 text-purple-600';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Trip History</h1>
                    <p className="text-slate-500 text-sm">View your past journeys and transactions.</p>
                </div>

                {/* Filters */}
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    {['All', 'Bus', 'Train'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setFilter(mode)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === mode
                                ? 'bg-slate-800 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <Card className="p-0 overflow-hidden border border-slate-100 bg-white/70 backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/80 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Mode</th>
                                <th className="px-6 py-4">Route Info</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.map((trip) => (
                                <tr key={trip.id} className="hover:bg-white/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getModeColor(trip.mode)} shadow-sm group-hover:scale-110 transition-transform`}>
                                            {getModeIcon(trip.mode)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-700 flex items-center gap-2">
                                            {trip.route}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <FaMapMarkerAlt size={10} /> {trip.mode} Line
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-xs font-medium text-slate-600">
                                            <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-slate-400" /> {trip.date}</span>
                                            <span className="flex items-center gap-1.5 mt-1"><FaClock className="text-slate-400" /> {trip.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${trip.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {trip.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-black text-slate-800">- LKR {trip.cost.toFixed(2)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredData.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        No trips found for this filter.
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TripHistory;
