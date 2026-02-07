import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main Content */}
        <main className="lg:ml-64 pt-16 min-h-screen">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
