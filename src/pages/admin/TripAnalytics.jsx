import React, { useState } from 'react';
import { TrendingUp, MapPin, Clock, Users, Calendar, Download } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import PremiumButton from '../../components/common/PremiumButton';
import { useNotification } from '../../contexts/NotificationContext';

const TripAnalytics = () => {
    const { notify } = useNotification();
    const [timeRange, setTimeRange] = useState('week');

    const tripStats = {
        totalTrips: 45280,
        activeRoutes: 24,
        avgDuration: 28,
        peakHours: '8:00 AM - 9:00 AM'
    };

    const popularRoutes = [
        {
            route: 'Central Station → Downtown',
            trips: 8540,
            avgDuration: 25,
            passengers: 12800,
            trend: 'up',
            trendValue: 12
        },
        {
            route: 'Airport → City Center',
            trips: 6720,
            avgDuration: 35,
            passengers: 10080,
            trend: 'up',
            trendValue: 8
        },
        {
            route: 'Suburb A → Central Station',
            trips: 5890,
            avgDuration: 22,
            passengers: 8835,
            trend: 'down',
            trendValue: 3
        },
        {
            route: 'University → Shopping Mall',
            trips: 4320,
            avgDuration: 18,
            passengers: 6480,
            trend: 'up',
            trendValue: 15
        },
        {
            route: 'Beach Road → Harbor',
            trips: 3810,
            avgDuration: 30,
            passengers: 5715,
            trend: 'up',
            trendValue: 5
        },
    ];

    const hourlyData = [
        { hour: '6 AM', trips: 1200 },
        { hour: '7 AM', trips: 2800 },
        { hour: '8 AM', trips: 4500 },
        { hour: '9 AM', trips: 3800 },
        { hour: '10 AM', trips: 2400 },
        { hour: '11 AM', trips: 2100 },
        { hour: '12 PM', trips: 2600 },
        { hour: '1 PM', trips: 2300 },
        { hour: '2 PM', trips: 2000 },
        { hour: '3 PM', trips: 2500 },
        { hour: '4 PM', trips: 3200 },
        { hour: '5 PM', trips: 4200 },
        { hour: '6 PM', trips: 4800 },
        { hour: '7 PM', trips: 3500 },
        { hour: '8 PM', trips: 2200 },
    ];

    const handleExport = () => {
        // Create CSV content
        let csvContent = "Trip Analytics Report\n\n";

        // Add summary
        csvContent += "Summary\n";
        csvContent += "Total Trips," + tripStats.totalTrips.toLocaleString() + "\n";
        csvContent += "Active Routes," + tripStats.activeRoutes + "\n";
        csvContent += "Average Duration," + tripStats.avgDuration + " minutes\n";
        csvContent += "Peak Hours," + tripStats.peakHours + "\n\n";

        // Add hourly data
        csvContent += "Hourly Trip Distribution\n";
        csvContent += "Hour,Trips\n";
        hourlyData.forEach(data => {
            csvContent += `${data.hour},${data.trips}\n`;
        });

        csvContent += "\nPopular Routes\n";
        csvContent += "Route,Total Trips,Avg Duration (min),Passengers,Trend\n";
        popularRoutes.forEach(route => {
            csvContent += `"${route.route}",${route.trips},${route.avgDuration},${route.passengers},${route.trend === 'up' ? '↑' : '↓'} ${route.trendValue}%\n`;
        });

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `trip_analytics_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        notify.success('Trip analytics report has been exported successfully', 'Export Complete');
    };

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text-tech">Trip Analytics</h1>
                    <p className="text-slate-500 mt-1">Analyze trip patterns and route performance</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <PremiumButton variant="glass" size="md" icon={<Calendar size={18} />}>
                        Date Range
                    </PremiumButton>
                    <PremiumButton variant="tech" size="md" icon={<Download size={18} />} onClick={handleExport}>
                        Export Data
                    </PremiumButton>
                </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-3 mb-6">
                {['today', 'week', 'month', 'year'].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${timeRange === range
                            ? 'bg-grad-tech text-white shadow-lg shadow-cyan-500/20'
                            : 'bg-white/70 backdrop-blur-glass text-slate-600 hover:bg-white'
                            }`}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                ))}
            </div>

            {/* Trip Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Total Trips</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-tech flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                        {tripStats.totalTrips.toLocaleString()}
                    </h3>
                    <div className="flex items-center mt-2 text-sm">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            ↑ 14%
                        </span>
                        <span className="text-slate-400 ml-2">vs last {timeRange}</span>
                    </div>
                </GlassCard>

                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Active Routes</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-eco flex items-center justify-center shadow-lg">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                        {tripStats.activeRoutes}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">Operating routes</p>
                </GlassCard>

                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Avg Duration</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-gold flex items-center justify-center shadow-lg">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                        {tripStats.avgDuration} min
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">Average trip time</p>
                </GlassCard>

                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Peak Hours</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-primary flex items-center justify-center shadow-lg">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">
                        {tripStats.peakHours}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">Busiest time</p>
                </GlassCard>
            </div>

            {/* Hourly Trip Distribution */}
            <GlassCard className="p-6 mb-8" hover={false}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Hourly Trip Distribution</h2>
                <div className="flex items-end justify-between h-64 gap-2">
                    {hourlyData.map((data, index) => {
                        const maxTrips = Math.max(...hourlyData.map(d => d.trips));
                        const height = (data.trips / maxTrips) * 100;
                        const isPeak = data.trips > 4000;

                        return (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                <div className="relative w-full group">
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ${isPeak ? 'bg-grad-alert' : 'bg-grad-tech'
                                            } hover:opacity-80`}
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                            {data.trips} trips
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-500 font-medium transform -rotate-45 origin-top-left mt-2">
                                    {data.hour}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>

            {/* Popular Routes */}
            <GlassCard className="p-6" hover={false}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Popular Routes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left">Route</th>
                                <th className="px-6 py-4 text-right">Total Trips</th>
                                <th className="px-6 py-4 text-right">Avg Duration</th>
                                <th className="px-6 py-4 text-right">Passengers</th>
                                <th className="px-6 py-4 text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {popularRoutes.map((route, index) => (
                                <tr key={index} className="hover:bg-white/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-grad-tech flex items-center justify-center">
                                                <MapPin className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-semibold text-slate-700">{route.route}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                                        {route.trips.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-600">
                                        {route.avgDuration} min
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-slate-700">
                                        {route.passengers.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${route.trend === 'up'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}>
                                            {route.trend === 'up' ? '↑' : '↓'} {route.trendValue}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default TripAnalytics;
