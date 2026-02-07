import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  Wallet, CreditCard, History, Bus, Plus, ArrowUpRight,
  QrCode, Shield, Zap, TrendingDown, TrendingUp, MoreHorizontal
} from 'lucide-react';

const SmartCard = () => {
  const [balance, setBalance] = useState(1550.00);
  const [topUpAmount, setTopUpAmount] = useState('');


  // Mock Data
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', amount: 150.00, title: 'Bus Trip #402', subtitle: 'Central Stn -> Downtown', date: 'Today, 8:30 AM', icon: <Bus /> },
    { id: 2, type: 'income', amount: 2000.00, title: 'Wallet Top Up', subtitle: 'Visa **** 4242', date: 'Yesterday, 6:00 PM', icon: <Zap /> },
    { id: 3, type: 'expense', amount: 200.00, title: 'Train Trip', subtitle: 'Suburb A -> Central Stn', date: 'Oct 23, 2023', icon: <Bus /> },
    { id: 4, type: 'expense', amount: 450.00, title: 'Morning Coffee', subtitle: 'Station Cafe', date: 'Oct 22, 2023', icon: <CreditCard /> },
  ]);

  const handleTopUp = (e) => {
    e.preventDefault();
    if (!topUpAmount) return;
    const amount = parseFloat(topUpAmount);
    setBalance(prev => prev + amount);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'income',
      amount: amount,
      title: 'Quick Top Up',
      subtitle: 'Manual Deposit',
      date: 'Just now',
      icon: <Zap />
    }, ...prev]);
    setTopUpAmount('');
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Digital Wallet</h1>
          <p className="text-slate-500 font-medium">Manage your smart card and travel expenses.</p>
        </div>
        <button className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <MoreHorizontal className="text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Card & Actions */}
        <div className="lg:col-span-1 space-y-6">

          {/* 3D Glass Card */}
          <div className="relative h-56 w-full perspective-1000 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02] border border-white/10">

              {/* Decorative Blobs */}
              <div className="absolute top-[-50%] right-[-50%] w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[60px]" />
              <div className="absolute bottom-[-50%] left-[-50%] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[60px]" />

              {/* Card Content */}
              <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      <Shield size={16} className="text-emerald-400" />
                    </div>
                    <span className="font-bold tracking-widest text-sm">SMTTS PASS</span>
                  </div>
                  <QrCode className="opacity-80" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Current Balance</p>
                  <h2 className="text-4xl font-black tracking-tight flex items-start gap-1">
                    <span className="text-lg mt-1 opacity-60">LKR</span>{balance.toFixed(2)}
                  </h2>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/50 uppercase">Card Holder</p>
                    <p className="font-mono text-sm tracking-wide">ALEXANDER DOE</p>
                  </div>
                  <p className="font-mono text-sm opacity-60">**** 8842</p>
                </div>
              </div>

              {/* Gloss Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Plus size={20} />, label: "Top Up", color: "bg-emerald-100 text-emerald-700" },
              { icon: <ArrowUpRight size={20} />, label: "Send", color: "bg-blue-100 text-blue-700" },
              { icon: <QrCode size={20} />, label: "Scan", color: "bg-purple-100 text-purple-700" },
              { icon: <MoreHorizontal size={20} />, label: "More", color: "bg-slate-100 text-slate-700" },
            ].map((action, idx) => (
              <button key={idx} className="flex flex-col items-center gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-2px]">
                <div className={`p-2.5 rounded-full ${action.color} mb-1`}>
                  {action.icon}
                </div>
                <span className="text-xs font-bold text-slate-600">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Top Up Panel (Inline) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Zap className="text-amber-500" size={18} /> Quick Deposit
            </h3>
            <form onSubmit={handleTopUp} className="space-y-4">
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-xs">LKR</span>
                  <input
                    type="number"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="0.00"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {[500, 1000, 2000, 5000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt.toString())}
                    className="flex-1 py-1 text-sm border border-slate-200 rounded hover:bg-slate-50"
                  >
                    +{amt}
                  </button>
                ))}
              </div>
              <Button type="submit" variant="primary" className="w-full py-3 shadow-lg shadow-emerald-900/10">
                Confirm Top Up
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Transactions & Analytics */}
        <div className="lg:col-span-2 space-y-6">

          {/* Spending Graph Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-800">Spending Overview</h3>
              <select className="bg-slate-50 border-none text-xs font-bold text-slate-600 rounded-lg py-1 px-3">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-40 flex items-end gap-2">
              {[40, 65, 30, 85, 50, 60, 45].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group overflow-hidden">
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full absolute bottom-0 left-0 rounded-t-lg transition-all duration-1000 ${i === 3 ? 'bg-gradient-to-t from-emerald-500 to-teal-400' : 'bg-slate-200 group-hover:bg-slate-300'
                      }`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium px-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Recent Transactions List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">Recent Activity</h3>
              <button className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-white border border-slate-100 text-slate-600'
                      }`}>
                      {React.cloneElement(tx.icon, { size: 20 })}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{tx.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{tx.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`block font-black text-sm ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-800'
                      }`}>
                      {tx.type === 'income' ? '+' : '-'} LKR {tx.amount.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{tx.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SmartCard;
