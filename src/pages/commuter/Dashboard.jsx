import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { FaMoneyBillWave, FaLeaf, FaMapMarkerAlt, FaHistory, FaBus, FaTrain, FaTaxi } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CommuterDashboard = () => {
  const navigate = useNavigate();

  // Mock Data
  const userData = {
    name: "Alex",
    balance: 1550.00,
    greenScore: 850,
    recentTrips: [
      { id: 1, route: "Central Stn -> Downtown", cost: 150.00, date: "2 mins ago", mode: "Bus" },
      { id: 2, route: "Suburb A -> Central Stn", cost: 200.00, date: "Yesterday", mode: "Train" },
    ]
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-4 border-b border-slate-200/60">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0F2027] to-[#203A43] mb-2">
            Hello, {userData.name}
          </h1>
          <p className="text-slate-500 font-medium">Ready for a sustainable journey today?</p>
        </div>
        <Button onClick={() => navigate('/commuter/routes')} variant="eco" size="lg" className="shadow-emerald-500/20">
          <FaMapMarkerAlt className="mr-2" /> Plan New Trip
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Wallet Card - Tech Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#134E5E] to-[#71B280] text-white shadow-xl shadow-emerald-900/20 p-6 flex flex-col justify-between h-48 group hover:scale-[1.02] transition-transform duration-300">
          {/* Background Decoration */}
          <div className="absolute -right-6 -top-6 text-white/10">
            <FaMoneyBillWave size={120} />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Total Balance</p>
                <h2 className="text-4xl font-black">LKR {userData.balance.toFixed(2)}</h2>
              </div>
              <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
                <FaMoneyBillWave />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex gap-3 mt-4">
            <button onClick={() => navigate('/commuter/wallet')} className="flex-1 bg-white text-[#134E5E] font-bold py-2 rounded-lg text-sm hover:bg-emerald-50 transition-colors shadow-sm">
              Top Up
            </button>
            <button
              onClick={() => navigate('/commuter/history')}
              className="px-4 py-2 bg-black/20 text-white rounded-lg text-sm font-medium hover:bg-black/30 backdrop-blur transition-all"
            >
              History
            </button>
          </div>
        </div>

        {/* Green Score Card - Eco Gradient */}
        <Card className="relative group border-t-4 border-t-[#71B280]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Green Score (SDG 11)</p>
              <h2 className="text-3xl font-black text-[#134E5E] mt-1">{userData.greenScore}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FaLeaf className="text-xl" />
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[#134E5E] to-[#71B280] h-full w-[85%] rounded-full"></div>
          </div>
          <p className="text-xs text-slate-500">
            You're in the top <span className="font-bold text-emerald-600">15%</span> of eco-commuters!
          </p>
        </Card>

        {/* Live Status Card - Alert Gradient for Delay */}
        <Card title="Start Your Journey">
          <div className="space-y-4">
            {/* Bus Option */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FaBus />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Bus 101</div>
                  <div className="text-xs text-slate-500">To Downtown</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-emerald-600">5 min</div>
                <div className="text-[10px] text-slate-400">On Time</div>
              </div>
            </div>

            {/* Train Option */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <FaTrain />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Express Train</div>
                  <div className="text-xs text-slate-500">To City Center</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-red-500">Delayed</div>
                <div className="text-[10px] text-slate-400">+10 min</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-8">
        <FaHistory className="text-slate-400" /> Recent Trips
      </h3>
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Route</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {userData.recentTrips.map((trip) => (
              <tr key={trip.id} className="hover:bg-white/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-700">{trip.route}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${trip.mode === 'Bus'
                    ? 'bg-blue-50 text-blue-600 border border-blue-100'
                    : 'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                    {trip.mode === 'Bus' ? <FaBus size={10} /> : <FaTrain size={10} />}
                    {trip.mode}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{trip.date}</td>
                <td className="px-6 py-4 text-right font-bold text-slate-800">- LKR {trip.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommuterDashboard;
