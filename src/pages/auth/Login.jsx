import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Lock, Loader2, Shield, AlertCircle, Bus, Eye, EyeOff, Sparkles, MapPin, Leaf } from 'lucide-react';

// Mock authService
const authService = {
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          resolve({
            token: 'mock-token',
            role: 'COMMUTER',
            username: credentials.username
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  }
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'COMMUTER'
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (error) setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.login(formData);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        const role = (data.role || data.userRole || '').toUpperCase();

        switch (role) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'DRIVER':
            navigate('/driver');
            break;
          case 'COMMUTER':
          default:
            navigate('/commuter');
            break;
        }
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-['Inter',system-ui,sans-serif]">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Bus className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-xl font-semibold text-white tracking-tight">SMTTS</span>
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Smart Transit,<br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Sustainable Future
                </span>
              </h1>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Experience seamless urban mobility with real-time tracking, digital payments, and eco-conscious travel.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: MapPin, text: 'Real-time vehicle tracking' },
                { icon: Shield, text: 'Secure digital payments' },
                { icon: Leaf, text: 'Carbon footprint insights' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-slate-500 text-sm">
            © 2026 SMTTS. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-800 tracking-tight">SMTTS</span>
          </div>
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back</h2>
            <p className="text-slate-500">Enter your credentials to access your account</p>
          </div>
          
          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            {['COMMUTER', 'DRIVER'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role }))}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  formData.role === role
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {role.charAt(0) + role.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span className="text-sm text-red-600 font-medium">{error}</span>
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
                  required
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold rounded-xl shadow-lg shadow-slate-900/10 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-slate-50 text-sm text-slate-400">or</span>
            </div>
          </div>
          
          {/* Register Link */}
          <p className="text-center text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
