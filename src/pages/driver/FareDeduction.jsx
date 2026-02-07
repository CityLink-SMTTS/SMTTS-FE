import React, { useState, useEffect } from 'react';

const FareDeduction = () => {
  const [mode, setMode] = useState('manual');
  const [manualAmount, setManualAmount] = useState('');
  const [message, setMessage] = useState('');
  const [autoLogs, setAutoLogs] = useState([]);

  // Simulate automatic fare deduction events
  useEffect(() => {
    let interval;
    if (mode === 'auto') {
      interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const amount = [50, 100, 150][Math.floor(Math.random() * 3)];
          const log = {
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            amount: amount,
            cardId: `**** ${Math.floor(1000 + Math.random() * 9000)}`
          };
          setAutoLogs(prev => [log, ...prev].slice(0, 5));
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [mode]);

  const handleManualDeduction = (e) => {
    e.preventDefault();
    if (!manualAmount) return;

    setMessage(`Successfully deducted Rs. ${manualAmount}`);
    setManualAmount('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Fare Deduction</h1>

      {/* Mode Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setMode('manual')}
          className={`px-6 py-2 rounded-full font-medium transition ${mode === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Manual Mode
        </button>
        <button
          onClick={() => setMode('auto')}
          className={`px-6 py-2 rounded-full font-medium transition ${mode === 'auto' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Automatic Simulation
        </button>
      </div>

      {mode === 'manual' ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Manual Entry</h2>
          <form onSubmit={handleManualDeduction}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount (Rs)</label>
              <input
                type="number"
                value={manualAmount}
                onChange={(e) => setManualAmount(e.target.value)}
                className="w-full p-3 border rounded-lg text-lg"
                placeholder="0.00"
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition">
              Deduct Fare
            </button>
          </form>
          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
              {message}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Live Transactions</h2>
            <span className="animate-pulse flex items-center text-sm text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Scanning...
            </span>
          </div>

          <div className="space-y-4">
            {autoLogs.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Waiting for passengers...</p>
            ) : (
              autoLogs.map(log => (
                <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-4 border-purple-500">
                  <div>
                    <p className="font-bold text-gray-800">Card: {log.cardId}</p>
                    <p className="text-xs text-gray-500">{log.time}</p>
                  </div>
                  <span className="font-bold text-green-600">+ Rs. {log.amount}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FareDeduction;
