import React from 'react';
import Card from '../../components/common/Card';
import { FaLeaf, FaTrophy, FaTree } from 'react-icons/fa';

const GreenScore = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold text-emerald-800 flex items-center gap-2 justify-center md:justify-start">
          <FaLeaf className="text-emerald-500" /> Sustainability Impact
        </h1>
        <p className="text-slate-500 mt-1">Track your contribution to a greener city!</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg col-span-1 md:col-span-2 flex items-center">
          <div className="flex-1">
            <p className="text-emerald-100 uppercase text-sm font-bold mb-2">Total Carbon Saved</p>
            <h2 className="text-5xl font-bold mb-4">124.5 <span className="text-2xl font-normal">kg</span></h2>
            <p className="text-sm opacity-90">That's equivalent to planting <span className="font-bold text-white">6 trees</span>! 🌳</p>
          </div>
          <div className="hidden sm:block opacity-20">
            <FaTree size={120} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
            <FaTrophy size={32} />
          </div>
          <h3 className="font-bold text-xl text-slate-800">Level 5</h3>
          <p className="text-sm text-slate-500">Eco Guardian</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
            <div className="bg-yellow-400 h-2 rounded-full w-3/4"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">750 / 1000 pts to next level</p>
        </div>
      </div>

      {/* Tips Section */}
      <h3 className="font-bold text-lg text-slate-700">Recommended for you</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-emerald-400">
          <h4 className="font-bold text-emerald-800">Take the Bus today!</h4>
          <p className="text-sm text-slate-600 mt-1">Bus Route 101 is arriving in 10 mins. Taking it instead of a cab saves 2.5kg CO2.</p>
        </Card>
        <Card className="border-l-4 border-l-emerald-400">
          <h4 className="font-bold text-emerald-800">Weekly Challenge</h4>
          <p className="text-sm text-slate-600 mt-1">Complete 5 bus trips this week to earn a <span className="font-bold">free coffee voucher</span>.</p>
        </Card>
      </div>
    </div>
  );
};

export default GreenScore;
