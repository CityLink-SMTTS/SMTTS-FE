import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Download, Filter } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import PremiumButton from '../../components/common/PremiumButton';
import { useNotification } from '../../contexts/NotificationContext';

const RevenueReports = () => {
    const { notify } = useNotification();
    const [timeRange, setTimeRange] = useState('month');

    const revenueData = {
        total: 2450000,
        growth: 12.5,
        transactions: 15420,
        avgTransaction: 158.92
    };

    const monthlyData = [
        { month: 'Jan', revenue: 180000, transactions: 1200 },
        { month: 'Feb', revenue: 195000, transactions: 1350 },
        { month: 'Mar', revenue: 210000, transactions: 1450 },
        { month: 'Apr', revenue: 225000, transactions: 1520 },
        { month: 'May', revenue: 240000, transactions: 1680 },
        { month: 'Jun', revenue: 255000, transactions: 1750 },
    ];

    const revenueByRoute = [
        { route: 'Central Station → Downtown', revenue: 450000, percentage: 18.4 },
        { route: 'Airport → City Center', revenue: 380000, percentage: 15.5 },
        { route: 'Suburb A → Central Station', revenue: 320000, percentage: 13.1 },
        { route: 'University → Shopping Mall', revenue: 280000, percentage: 11.4 },
        { route: 'Others', revenue: 1020000, percentage: 41.6 },
    ];

    const handleExport = () => {
        // Create CSV content
        let csvContent = "Revenue Report\n\n";

        // Add summary
        csvContent += "Summary\n";
        csvContent += "Total Revenue,Rs. " + revenueData.total.toLocaleString() + "\n";
        csvContent += "Total Transactions," + revenueData.transactions.toLocaleString() + "\n";
        csvContent += "Average Transaction,Rs. " + revenueData.avgTransaction + "\n";
        csvContent += "Growth Rate," + revenueData.growth + "%\n\n";

        // Add monthly data
        csvContent += "Monthly Revenue\n";
        csvContent += "Month,Revenue,Transactions\n";
        monthlyData.forEach(data => {
            csvContent += `${data.month},${data.revenue},${data.transactions}\n`;
        });

        csvContent += "\nRevenue by Route\n";
        csvContent += "Route,Revenue,Percentage\n";
        revenueByRoute.forEach(route => {
            csvContent += `"${route.route}",${route.revenue},${route.percentage}%\n`;
        });

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `revenue_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        notify.success('Revenue report has been exported successfully', 'Export Complete');
    };

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text-gold">Revenue Reports</h1>
                    <p className="text-slate-500 mt-1">Track and analyze revenue performance</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <PremiumButton variant="glass" size="md" icon={<Filter size={18} />}>
                        Filter
                    </PremiumButton>
                    <PremiumButton variant="gold" size="md" icon={<Download size={18} />} onClick={handleExport}>
                        Export Report
                    </PremiumButton>
                </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-3 mb-6">
                {['week', 'month', 'quarter', 'year'].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${timeRange === range
                            ? 'bg-grad-gold text-white shadow-lg shadow-orange-500/20'
                            : 'bg-white/70 backdrop-blur-glass text-slate-600 hover:bg-white'
                            }`}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                ))}
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Total Revenue</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-gold flex items-center justify-center shadow-lg">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                        Rs. {(revenueData.total / 1000000).toFixed(2)}M
                    </h3>
                    <div className="flex items-center mt-2 text-sm">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            ↑ {revenueData.growth}%
                        </span>
                        <span className="text-slate-400 ml-2">vs last {timeRange}</span>
                    </div>
                </GlassCard>

                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Transactions</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-tech flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                        {revenueData.transactions.toLocaleString()}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">Total transactions</p>
                </GlassCard>

                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Avg Transaction</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-eco flex items-center justify-center shadow-lg">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                        Rs. {revenueData.avgTransaction}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">Per transaction</p>
                </GlassCard>

                <GlassCard className="p-6" hover={true}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium text-sm">Growth Rate</span>
                        <div className="w-10 h-10 rounded-xl bg-grad-primary flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                        {revenueData.growth}%
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">Month over month</p>
                </GlassCard>
            </div>

            {/* Revenue Chart */}
            <GlassCard className="p-6 mb-8" hover={false}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Monthly Revenue Trend</h2>
                <div className="space-y-4">
                    {monthlyData.map((data, index) => {
                        const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
                        const percentage = (data.revenue / maxRevenue) * 100;

                        return (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-600 w-12">{data.month}</span>
                                    <span className="text-sm font-bold text-slate-800">
                                        Rs. {(data.revenue / 1000).toFixed(0)}K
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="h-full bg-grad-gold rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>

            {/* Revenue by Route */}
            <GlassCard className="p-6" hover={false}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Revenue by Route</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left">Route</th>
                                <th className="px-6 py-4 text-right">Revenue</th>
                                <th className="px-6 py-4 text-right">Percentage</th>
                                <th className="px-6 py-4 text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {revenueByRoute.map((route, index) => (
                                <tr key={index} className="hover:bg-white/80 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-slate-700">{route.route}</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                                        Rs. {(route.revenue / 1000).toFixed(0)}K
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold">
                                            {route.percentage}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-green-600 font-medium text-sm">↑ 8%</span>
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

export default RevenueReports;
